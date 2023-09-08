"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Search, Filter } from "react-feather";

import { amantic_sc } from "../fonts";
import styles from "./home.module.css";
import headers from "./headers.json";
import { apiPet } from "@/services/api-pet";
import Loading from "@/components/loading";
import Pagination from "@/components/pagination";

type Pet = {
  id: string;
  name: string;
  breed: string;
  birthDay: string;
  identifyNumberCustomer: string;
  createdAt: string;
};

type Data = {
  totalPet?: number;
  next?: number;
  previous?: number;
  pets: Pet[];
};

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [sorting, setSorting] = useState({ field: "name", ascending: false });
  const [data, setData] = useState<Data | null>();

  useEffect(() => {
    setLoading(true);
    getData();
    setLoading(false);
  }, []);

  async function getData(pageNumber: number = 0) {
    setErrorMessage("");
    try {
      const response: { data: Data } = await apiPet.get(
        `/pet?pageNumber=${pageNumber}`
      );
      setData(response.data);
    } catch (error) {
      setData(null);
      setErrorMessage("Sorry, there was an error, please try again later. 🙀");
    }
  }

  async function handleSearch() {
    setErrorMessage("");
    setData(null);
    try {
      const response: { data: Pet[] } = await apiPet.get(
        `/pet/search?query=${search}`
      );
      setData({ pets: response.data });
    } catch (error) {
      setErrorMessage("pet not found");
    }
  }

  function handleSorting(field: string, ascending: boolean) {
    if (!ascending) {
      data?.pets.sort((a, b) =>
        a[field as keyof Pet] > b[field as keyof Pet] ? 1 : -1
      );
    } else {
      data?.pets.sort((a, b) =>
        a[field as keyof Pet] > b[field as keyof Pet] ? -1 : 1
      );
    }
    setSorting({ field, ascending });
  }

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString("pt-BR");
  }

  function handleLogout() {
    Cookies.remove("token");
    router.push("/");
  }

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <button
          type="button"
          className={`${styles.btnAdd} ${styles.btn}`}
          onClick={() => router.push("/registerPet")}
        >
          + Add
        </button>
        <div className={styles.search}>
          <input
            placeholder="search..."
            type="text"
            id="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="button" onClick={() => handleSearch()}>
            <Search color={"#faab78"} size={24} />
          </button>
        </div>
        <button
          className={`${styles.btnLogout} ${styles.btn}`}
          type="button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </header>
      <h1 className={`${amantic_sc.className} ${styles.title}`}>Petshop</h1>

      <div className={styles.content}>
        {loading && <Loading />}
        {errorMessage && (
          <span className={styles.emptyListPets}>{errorMessage}</span>
        )}
        {data && (
          <>
            <table className={styles.contentTable}>
              <thead>
                <tr>
                  {Object.entries(headers).map(([field, value]) => (
                    <th key={field}>
                      {field === "name" || field === "createdAt" ? (
                        <div className={styles.sort}>
                          {value}
                          <button
                            onClick={() =>
                              handleSorting(field, !sorting.ascending)
                            }
                          >
                            <Filter color={"#faab78"} size={18} />
                          </button>
                        </div>
                      ) : (
                        value
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.pets.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.breed}</td>
                      <td>{item.birthDay}</td>
                      <td>{item.identifyNumberCustomer}</td>
                      <td>{item.id}</td>
                      <td>{formatDate(item.createdAt)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <Pagination
              next={data.next}
              previous={data.previous}
              getData={getData}
            />
          </>
        )}
      </div>
    </main>
  );
}
