export type indexProps = {
  name: string;
};

function Index({ name }: indexProps) {
  return (
    <p
      style={{
        margin: 0,
        width: "100%",
        height: "80vh",
        background: "#111",
        color: "#fcfcfc",
        padding: "1.5rem",
        fontSize: "2rem",
        fontFamily: "monospace",
      }}
    >
      {name}
    </p>
  );
}
function Home() {
  return <Index name="To the 🚀 🌕"></Index>;
}
export default Home;
