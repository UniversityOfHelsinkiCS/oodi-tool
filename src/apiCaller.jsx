// Not yet in use

export const fetchFrozenCourses = () => {
  //TODO: Add error handling
  fetch('http://localhost:4567/frozen_courses')
      .then((response) => {
        return response.json();
      }).then((data) => {
        console.log(data);
        return data;
      });
}
