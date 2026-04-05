import { Malfunction } from "@mytypes/malfunction";
import getMalfunction from "@utils/getMalfunction";
import Image from "next/image";
import { useEffect, useState } from "react";
interface IMalfunction {
  handleClickMalfunction: (event: boolean) => void;
  choosenMalfunction: string | null | undefined;
}
const MalfunctionDetail = ({
  handleClickMalfunction,
  choosenMalfunction,
}: IMalfunction) => {
  const [data, setData] = useState<Malfunction | null | undefined>(undefined);
  // const images = data?.image_url;

  useEffect(() => {
    async function fetchData() {
      const dataServ = await getMalfunction(choosenMalfunction);
      setData(dataServ);
    }

    fetchData();
  }, [choosenMalfunction]);

  console.log(data);
  return (
    <>
      <div className="help__header">
        <button
          className="help--back"
          onClick={() => handleClickMalfunction(false)}
        >
          <Image src="/icon/back.svg" alt="" width={8.5} height={15} />
          Назад
        </button>
      </div>
      {!data ? (
        ""
      ) : (
        <div className="malfunction-detail">
          <div className="malfunction-detail__left">
            <div className="malfunction-detail__header">
              <p className="malfunction-detail--title">{data.title}</p>
              <p className="malfunction-detail--description">
                {data.description}
              </p>
            </div>
            {/* <div className="malfunction-detail__accident-reason">
              <p className="malfunction-detail__accident-reason--header">
                Причина аварии
              </p>
              <ol className="malfunction-detail__accident-reason__content">
                <li>Большой расход воды</li>
                <li>Высокое давление сухого хода</li>
                <li>Маленькое время всасывания</li>
                <li>
                  Забились фильтры, которые находятся между насосом и реле
                  давления
                </li>
                <li>В системе появилась утечка</li>
                <li>Произошло разрушение трубопроводов или фитингов</li>
                <li>Износились рабочие колеса насоса</li>
                <li>Низкое напряжение в электрической сети</li>
              </ol>
            </div>
            <div className="malfunction-detail__accident-reason__whattodo">
              <p className="malfunction-detail__accident-reason__whattodo--header">
                Что делать
              </p>
              <div className="malfunction-detail__accident-reason__whattodo--content">
                <p>
                  Нажмите кнопку «Старт/стоп». Если вода появится, возможно,
                  производится отбор большого количества воды длительное время,
                  и в таком режиме давление в системе не может подняться выше
                  давления сухого хода.
                  <br /> В таком случае необходимо уменьшить расход воды или
                  уменьшить давление сухого хода.
                  <br /> Если вода не появится, то отключите насос от реле и
                  подключите напрямую к розетке 220 В.
                  <br /> Если вода появится - неисправно реле давления. Если
                  вода не появится – возможно неисправен насос, либо оторвался
                  шланг или повреждена труба, либо в источнике нет воды.
                  <br /> Возможно, между насосом и реле давления установлен
                  фильтр, и он забился. По этой причине давление не доходит до
                  реле. Необходимо почистить фильтр.
                  <br />
                  Возможно время достижения давления до уровня давления сухого
                  хода установлено слишком маленьким. Для скважинных насосов
                  время всасывания необходимо установить «С030», а для
                  поверхностных «С180».
                </p>
              </div>
            </div> */}
          </div>
          <div className="malfunction-detail__right">
            <Image
              src={`https://extrabackend.duckdns.org${data.image}`}
              width={293.689697265625}
              height={154.60231018066406}
              alt=""
            />
          </div>
        </div>
      )}
    </>
  );
};

export default MalfunctionDetail;
