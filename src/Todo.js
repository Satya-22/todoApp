export default function Todo({
  title,
  description,
  author,
  dateCreated,
  completed,
  handleCheckBoxToggle,
}) {
    function onCheckboxChange() {
        handleCheckBoxToggle(title);
    }
    const date = new Date();

    let currentDay = String(date.getDate()).padStart(2, "0");

    let currentMonth = String(date.getMonth() + 1).padStart(2, "0");

    let currentYear = date.getFullYear();

    // we will display the date as DD-MM-YYYY

    let currentDate = `${currentDay}-${currentMonth}-${currentYear}`;


  return (
    <div>
      <h3> Title : {title}</h3>
      <div>Description : {description}</div>
      <br />
      <div>Author: {author}</div>
      <br />
      <div>DateCreated : {dateCreated}</div>
      <div>
        Completed :{" "}
        <input
          type="checkbox"
          checked={completed}
          onChange={onCheckboxChange}
        />
      </div>

      {(() => {
        if (completed) {
          return <div>dateCompleted : {currentDate}</div>;
        } 
      })()}

      
      <br />
    </div>
  );
}