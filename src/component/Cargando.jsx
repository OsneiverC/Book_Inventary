const Cargar = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg text-center">
        <p className="text-lg font-semibold text-[#5B4A2E] mb-4">Cargando...</p>
        <div className="loader mx-auto border-4 border-[#C19D5E] border-t-transparent rounded-full w-12 h-12 animate-spin"></div>
      </div>
    </div>
  );
};

export default Cargar;
