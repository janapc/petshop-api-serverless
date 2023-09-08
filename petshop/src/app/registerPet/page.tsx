"use client";
import { ChangeEvent, useState } from "react";
import { apiPet } from "@/services/api-pet";
import { ArrowLeft } from "react-feather";
import { useRouter } from "next/navigation";

import styles from "./registerPet.module.css";
import { amantic_sc } from "../fonts";

import Toast from "@/components/toast";
import handleErrorRequest from "@/util/handleErrorRequest";

type Data = {
  name: string;
  breed: string;
  birthDay: string;
  identifyNumberCustomer: string;
};

type ErrorMessage = {
  origin: string;
  msg: string;
};

const initialValues = {
  name: "",
  breed: "",
  birthDay: "",
  identifyNumberCustomer: "",
};

const initialValueToast = { show: false, msg: "" };
const initialValueError = { origin: "", msg: "" };

export default function RegisterPet() {
  const router = useRouter();
  const [data, setData] = useState<Data>(initialValues);
  const [toast, setToast] = useState(initialValueToast);
  const [selectedFile, setSelectedFile] = useState<File>();
  const [errorMessage, setErrorMessage] =
    useState<ErrorMessage>(initialValueError);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(initialValueError);
    try {
      if (!Object.values(data).every((item) => item.length)) {
        setErrorMessage({ origin: "form", msg: "Please fill this form" });
        return;
      }
      const birthDayFormatted = data.birthDay.replace(
        /(\d{4})-(\d{2})-(\d{2})/,
        "$3/$2/$1"
      );
      const { status } = await apiPet.post(`/pet`, {
        ...data,
        birthDay: birthDayFormatted,
      });
      if (status === 201) {
        setToast({ show: true, msg: "pet registed with success" });
        setTimeout(() => {
          setToast(initialValueToast);
          setData(initialValues);
        }, 3000);
      }
    } catch (error) {
      const formatError = handleErrorRequest(error);
      setErrorMessage({ origin: "form", msg: formatError.error });
    }
  }

  function handleChangeFile(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files?.length) {
      setSelectedFile(event.target.files[0]);
    }
  }

  async function handleSendFile() {
    setErrorMessage(initialValueError);
    try {
      const data = new FormData();
      if (!selectedFile) return;
      data.append("file", selectedFile);
      const { status } = await apiPet.post(`/pet/batch`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (status === 200) {
        setToast({ show: true, msg: "pets are being registered" });
        setTimeout(() => {
          setToast(initialValueToast);
        }, 3000);
      }
    } catch (error) {
      setErrorMessage({
        origin: "file",
        msg: "Sorry, there was an error, please try again later.",
      });
    }
  }

  return (
    <main className={styles.main}>
      {toast.show && <Toast msg={toast.msg} />}
      <div className={styles.card}>
        <div className={`${styles.brand} ${amantic_sc.className}`}>
          <button
            className={styles.btnGoBack}
            onClick={() => router.push("/home")}
          >
            <ArrowLeft size={32} color={"#363837"} />
          </button>
          <h1>Petshop</h1>
        </div>
        <div className={styles.content}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <h2>Register Pet</h2>
            <label>
              Name:
              <input
                type="text"
                name="name"
                onChange={(e) => setData({ ...data, name: e.target.value })}
                value={data.name}
              />
            </label>
            <label>
              Breed:
              <input
                type="text"
                name="breed"
                onChange={(e) => setData({ ...data, breed: e.target.value })}
                value={data.breed}
              />
            </label>
            <label>
              BirthDay:
              <input
                type="date"
                name="birthDay"
                onChange={(e) => setData({ ...data, birthDay: e.target.value })}
                value={data.birthDay}
              />
            </label>
            <label>
              Identify Number(Customer):
              <input
                type="text"
                name="identifyNumberCustomer"
                onChange={(e) =>
                  setData({ ...data, identifyNumberCustomer: e.target.value })
                }
                value={data.identifyNumberCustomer}
              />
            </label>
            {errorMessage.origin === "form" && (
              <span className={styles.errorMessage}>{errorMessage.msg}</span>
            )}
            <button type="submit">Register</button>
          </form>
          <p className={styles.separator}>Or input your csv file</p>
          <div className={styles.contentFile}>
            <input type="file" accept=".csv" onChange={handleChangeFile} />
            <button type="button" onClick={handleSendFile}>
              Send
            </button>
          </div>
          {errorMessage.origin === "file" && (
            <span className={styles.errorMessage}>{errorMessage.msg}</span>
          )}
        </div>
      </div>
    </main>
  );
}
