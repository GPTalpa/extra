import "./style.scss";

type Props = {
  total: number;
  completed: number;
};

const ProgressDots = ({ total, completed }: Props) => {
  return (
    <div
      style={{ display: "flex", gap: 5.5, flexWrap: "wrap" }}
      className="progressDots"
    >
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="progressDots--dot"
          style={{
            borderRadius: "50%",
            background:
              i < completed
                ? "rgba(250, 40, 40, 1)"
                : "rgba(255, 255, 255, 0.1)",
          }}
        />
      ))}
    </div>
  );
};

export default ProgressDots;
