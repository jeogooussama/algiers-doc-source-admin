// Edit.js
import { useNavigate } from 'react-router-dom';
import EditInterface from './EditInterface'; // Import your EditInterface component
import EditLinedPaper from './EditLinedPaper'; // Import your EditLinedPaper component

const Edit = () => {
  const navigate = useNavigate();

  // Assume you have some data or condition to determine the type
  const fileType  /* Logic to determine the file type (e.g., 'interface' or 'linedPaper') */;
  
  // You can add more conditions or customize as needed
  const renderEditComponent = () => {
    if (fileType === 'interface') {
      // Render EditInterface component for interface type
      return <EditInterface />;
    } else if (fileType === 'linedPaper') {
      // Render EditLinedPaper component for linedPaper type
      return <EditLinedPaper />;
    } else {
      // Handle other cases or show an error message
      return <div>Invalid file type</div>;
    }
  };

  return (
    <div>
      {/* Use the dynamically rendered component */}
      {renderEditComponent()}

      {/* You can add additional content or buttons as needed */}
      <button onClick={() => navigate('/')}>Go back to Home</button>
    </div>
  );
}

export default Edit;
