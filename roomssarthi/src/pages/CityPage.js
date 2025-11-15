import { useNavigate } from "react-router-dom";

function CityPage() {
  const navigate = useNavigate();

  const handleCityClick = (cityName) => {
    navigate(`/flatmatefinder/${cityName}`);
  };

  return (
    <div>
      <h2>Select a City</h2>
      <button onClick={() => handleCityClick("Warje")}>Warje</button>
      <button onClick={() => handleCityClick("Kothrud")}>Kothrud</button>
    </div>
  );
}

export default CityPage;
