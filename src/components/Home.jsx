const Home = () => {
  return (
    <section className="flex items-center justify-center w-full h-lvh">
      <div class="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
      <div className="flex flex-col items-center justify-center h-full gap-y-18">
        <h1 className="text-center text-6xl">Taste Bud</h1>
        <h2 className="text-center text-4xl" >Ready for a recipe?</h2>
        <button>get recipe</button>
      </div>
    </section>
  );
};

export default Home;
