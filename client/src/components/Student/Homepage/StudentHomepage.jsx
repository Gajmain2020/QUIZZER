import Footer from "../../Footer/Footer";
import Navbar from "../../Navbar/Navbar";

export default function Homepage() {
  const user = JSON.parse(localStorage.getItem("token"));

  function handleResultClick() {
    alert("result button cliked");
  }
  function handleTestClick() {
    alert("test button cliked");
  }

  return (
    <>
      <Navbar />
      <div className="homepage-button-container">
        {/* sajawat hona hai isme abhi */}
        <div>No. Of test attempted :: </div>
        <div>No. Of test Unattempted:: </div>
        <div>No. Of total test :: </div>
        {/* sajawat hona hai isme abhi */}
        <button onClick={handleTestClick}>Tests</button>
        <button onClick={handleResultClick}>Results</button>
      </div>
      <Footer />
    </>
  );
}
