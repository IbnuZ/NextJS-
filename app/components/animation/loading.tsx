const Loading = () => {
    return (
        <div style={{ backgroundColor: "#096a88", minHeight: "100vh" }}>
          <div className="flex items-center justify-center h-screen bg-cover bg-center overflow-hidden" style={{ backgroundImage: "url(/img/background.png)" }}>
            <div className="w-32 h-32 border-t-8 border-[#FF7E06] border-solid rounded-full animate-spin"></div>
          </div>
        </div>
      );
  };
  
  export default Loading;