import pickle
import re
import string

import nltk
import numpy as np
import pandas as pd
from nltk.corpus import stopwords
from num2words import num2words
from pymystem3 import Mystem
from sklearn import metrics
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.neighbors import NearestNeighbors
from transliterate import translit

nltk.download("stopwords")
nltk.download("punkt")
m = Mystem()


RANDOM_STATE = 42


def read_data():
    """
    Reads data from CSV files.
    """
    product = pd.read_csv("data/marketing_product.csv", sep=";")
    dealerprice = pd.read_csv("data/marketing_dealerprice.csv", sep=";")
    productdealer = pd.read_csv("data/marketing_productdealerkey.csv", sep=";")
    return product, dealerprice, productdealer


def merge_data(dealerprice, productdealer):
    """
    Merges dealerprice and productdealer dataframes.
    """
    merged_df = pd.merge(
        dealerprice, productdealer, left_on="product_key", right_on="key", how="left"
    )
    dealerprice["product_id"] = merged_df["product_id"]
    return dealerprice


def add_product_id(dealerprice, product):
    """
    Adds product IDs to the dealerprice dataframe and drop dublicates.
    """
    dealerprice["product_id"] = dealerprice.groupby("product_name")[
        "product_id"
    ].ffill()
    dealerprice["product_id"].fillna(0, inplace=True)
    dealerprice["product_id"] = dealerprice["product_id"].astype(int)

    product = product.dropna(subset=["name_1c"])
    product = product.drop_duplicates(subset=["name_1c"])

    dealerprice = dealerprice.drop_duplicates(subset=["product_name"])

    return dealerprice, product


def stop_words():
    """
    Creates a list of stopwords.
    """
    stop_words_list = list(stopwords.words("russian"))
    words_to_remove = ["один", "два", "три"]

    stop_words_list = [word for word in stop_words_list if word not in words_to_remove]

    return stop_words_list


def clean_text(text):
    """
    Cleans and preprocesses text data.
    """
    def replace_numbers_with_words(words):
        for i in range(len(words)):
            word = words[i]
            if word.isdigit():
                num_word = num2words(int(word), lang="ru")
                words[i] = num_word

        replaced_text = " ".join(words)
        return replaced_text

    text_no_punct = re.sub(
        rf"[{re.escape(''.join(set(string.punctuation) - {'.', ',', ':', '-' }))}]",
        " ",
        text,
    )
    text_no_punct = text_no_punct.replace(".", ",")

    text_with_spaces = re.sub(
        r"(\d)([A-Za-zА-ЯЁа-яё])|([A-Za-zА-ЯЁа-яё])(\d)", r"\1 \2", text_no_punct
    )
    text_with_spaces = re.sub(
        r"(?<=[а-я])(?=[А-Я])|(?<=[a-z])(?=[A-Z])", " ", text_with_spaces
    )
    text_with_spaces = re.sub(r"(\d+),(\d+)", r"\1.\2", text_with_spaces)
    text_with_spaces = re.sub(r"(\b)\,", r"\1", text_with_spaces)

    split_words = re.sub(
        r"(?<=[А-ЯЁа-яё])(?=[A-Za-z])|(?<=[A-Za-z])(?=[А-ЯЁа-яё])",
        " ",
        text_with_spaces,
    )
    split_words = re.sub(r"\bл\b", "литр", split_words)
    split_words = re.sub(r"\bг\b", "грамм", split_words)
    split_words = re.sub(r"\bкг\b", "килограмм", split_words)
    split_words = re.sub(r"\bмл\b", "миллилитр", split_words)
    split_words = split_words.lower()
    split_words = (
        split_words.replace("prosept", "")
        .replace("просепт", "")
        .replace("жидкое", "")
        .replace("средство", "")
    )
    lemmatized_text = m.lemmatize(split_words)
    filtered_words = [
        word.strip()
        for word in lemmatized_text
        if word.lower().strip() not in stop_words_list
    ]

    replaced_numbers_text = replace_numbers_with_words(filtered_words)
    transliterated_text = [
        translit(word, "ru", reversed=True) for word in replaced_numbers_text
    ]
    cleaned_text = "".join(transliterated_text)
    cleaned_text = re.sub(r"\s+", " ", cleaned_text).strip()

    return cleaned_text


def process_product_data(product):
    """
    Processes product data by applying text cleaning.
    """
    product["name_1c_clean"] = product["name_1c"].apply(clean_text)
    return product


def process_dealer_data(dealerprice):
    """
    Processes dealer data by applying text cleaning.
    """
    dealerprice["product_name_clean"] = dealerprice["product_name"].apply(clean_text)
    return dealerprice


def preprocess_data(product, dealerprice):
    """
    Preprocesses product and dealer data.
    """
    unique_df_1 = product.drop_duplicates(subset=["name_1c_clean"])
    unique_df_2 = dealerprice.drop_duplicates(subset=["product_name_clean"])

    documents_set1_cleaned = np.array(unique_df_1["name_1c_clean"])
    documents_set2_cleaned = np.array(unique_df_2["product_name_clean"])

    return documents_set1_cleaned, documents_set2_cleaned, unique_df_1, unique_df_2


def vectorize_text(documents_set1_cleaned, documents_set2_cleaned):
    """
    Converts text data into TF-IDF vectors.
    """
    documents = np.concatenate([documents_set1_cleaned, documents_set2_cleaned])
    tfidf_vectorizer = TfidfVectorizer()
    tfidf_matrix = tfidf_vectorizer.fit_transform(documents)

    tfidf_matrix_set1 = tfidf_matrix[: len(documents_set1_cleaned)]
    tfidf_matrix_set2 = tfidf_matrix[len(documents_set1_cleaned) :]

    return tfidf_matrix_set1, tfidf_matrix_set2


def find_neighbors(tfidf_matrix_set1, tfidf_matrix_set2, n_neighbors=20):
    """
    Finds nearest neighbors based on cosine similarity.
    """
    nbrs = NearestNeighbors(n_neighbors=n_neighbors, metric="cosine").fit(
        tfidf_matrix_set1
    )
    distances, indices = nbrs.kneighbors(tfidf_matrix_set2)
    return distances, indices


def create_dataframe(
    documents_set1_cleaned,
    documents_set2_cleaned,
    distances,
    indices,
    unique_df_1,
    unique_df_2,
):
    """
    Creates a dataframe with obtained data.
    """
    data = []

    for i, neighbors in enumerate(indices):
        distances_for_doc = distances[i]
        for rank, (idx, dist) in enumerate(zip(neighbors, distances_for_doc)):
            doc_name_set1 = documents_set1_cleaned[idx]
            doc_name_set2 = documents_set2_cleaned[i]

            if idx < len(np.array(unique_df_1["name_1c"])):
                doc_name_dealerprice = np.array(unique_df_2["product_name"])[i]
                doc_name_product = np.array(unique_df_1["name_1c"])[idx]
                product_id_dealer = unique_df_2["product_id"].iloc[i]
                product_id = unique_df_1["id"].iloc[idx]

                if product_id_dealer == product_id:
                    target = 1
                else:
                    target = 0

                data.append(
                    {
                        "document_set1": doc_name_set1,
                        "document_set2": doc_name_set2,
                        "name_dealerprice": doc_name_dealerprice,
                        "name_1c": doc_name_product,
                        "distance": dist,
                        "rank": rank + 1,
                        "product_id_dealer": product_id_dealer,
                        "product_id": product_id,
                        "target": target,
                    }
                )
            else:
                print(f"Index {idx} is out of bounds.")

    df_nn = pd.DataFrame(data)
    return df_nn


def process_data(df_nn: pd.DataFrame):
    """
    Processes data and prepares it for model training.
    """
    X = df_nn[["document_set1", "document_set2", "distance"]]
    y = df_nn["target"]

    categorical = ["document_set1", "document_set2"]
    X[categorical] = X[categorical].astype('str')

    return X, y


def load_model(model_path):
    """
    Loads a pre-trained machine learning model.
    """
    with open(model_path, "rb") as file:
        loaded_model = pickle.load(file)
    return loaded_model


def predict_probability_for_target_1(
    X, model_path="model/trained_catboost_model.pkl"
):
    """
    Predicts probabilities for target label 1 using a pre-trained model.
    """
    model_ctb = load_model(model_path)

    probabilities = model_ctb.predict_proba(X)[:, 1]

    return probabilities


def generate_final_table(probabilities, df_nn):
    """
    Generates a final table with predicted probabilities and computes metrics.
    """
    df_nn["Predicted_Class1"] = probabilities

    result = (
        df_nn.groupby(df_nn.index // 20)
        .apply(lambda x: x.sort_values(by="Predicted_Class1", ascending=False))
        .reset_index(drop=True)
    )

    result.drop(
        ["document_set1", "document_set2"], axis=1, inplace=True
    )

    def compute_metrics(group):
        top_20 = group.nlargest(20, 'Predicted_Class1')
        if (top_20['target'] == 1).any():  # Проверка наличия хотя бы одной единицы в топ-20
            top_5 = top_20.nlargest(5, 'Predicted_Class1')  # Выбираем топ-5 из топ-20
            true_positives = (top_5['target'] == 1).sum() 
            actual_positives = (group['target'] == 1).sum()  
            accuracy_5 = true_positives  # Accuracy@5
            recall_5 = true_positives / actual_positives if actual_positives != 0 else 0  # Recall@5
            mrr_5 = 1 / (top_5['target'].values.argmax() + 1)  # MRR@5
            return pd.Series({'accuracy@5': accuracy_5, 'recall@5': recall_5, 'mrr@5': mrr_5})
        else:
            return pd.Series({'accuracy@5': np.nan, 'recall@5': np.nan, 'mrr@5': np.nan})

    metrics = result.groupby(np.arange(len(result)) // 20).apply(compute_metrics).mean()

    return result, metrics


if __name__ == "__main__":
    product, dealerprice, productdealer = read_data()

    dealerprice = merge_data(dealerprice, productdealer)

    dealerprice, product = add_product_id(dealerprice, product)

    stop_words_list = stop_words()

    product = process_product_data(product)

    dealerprice = process_dealer_data(dealerprice)

    (
        documents_set1_cleaned,
        documents_set2_cleaned,
        unique_df_1,
        unique_df_2,
    ) = preprocess_data(product, dealerprice)

    tfidf_matrix_set1, tfidf_matrix_set2 = vectorize_text(
        documents_set1_cleaned, documents_set2_cleaned
    )

    distances, indices = find_neighbors(tfidf_matrix_set1, tfidf_matrix_set2)

    df_nn = create_dataframe(
        documents_set1_cleaned,
        documents_set2_cleaned,
        distances,
        indices,
        unique_df_1,
        unique_df_2,
    )

    X, y = process_data(df_nn)

    probabilities = predict_probability_for_target_1(X)

    result, metrics = generate_final_table(probabilities, df_nn)

    print(result, metrics)
