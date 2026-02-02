// import { Metadata } from "next";
import "./style.scss";

export default async function check() {
  return (
    <main>
      <section className="check">
        <h1>Проверьте почту</h1>
        <p>Проверить почту. Ссылка действительна в течение 10 минут</p>
      </section>
    </main>
  );
}
