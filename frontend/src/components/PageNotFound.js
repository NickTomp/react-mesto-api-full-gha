import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
function PageNotFound() {
  const navigate = useNavigate();
  function goBack() {
    navigate(-1);
  }
  return (
    <>
      <h1 className='notfound__caption'>Такой страницы не существует!</h1>
      <button className='notfound__button' onClick={goBack}>Назад</button>
    </>
  );
}
export default PageNotFound;