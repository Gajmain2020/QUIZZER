import Footer from "../../Footer/Footer";
import Navbar from "../../Navbar/Navbar";

function TeacherHomepage() {
  function handleCreateTestClick() {
    alert("Create Test button clicked");
  }
  function handleViewAllStudentsClick() {
    alert("View all student button clicked");
  }
  function handleViewReportClick() {
    alert("View report button clicked");
  }

  return (
    <div>
      <Navbar />
      <div>No. Of test Created</div>
      <div>No. Of Student </div>
      <button onClick={handleCreateTestClick}>Create Test</button>
      <button onClick={handleViewReportClick}>View Reports</button>
      <button onClick={handleViewAllStudentsClick}>See all student</button>
      <Footer />
    </div>
  );
}
export default TeacherHomepage;
