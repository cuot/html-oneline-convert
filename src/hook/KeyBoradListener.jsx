export default function KeyBoradListener() {
  // window.addEventListener("keydown", (e) => {
  //   const key = document.getElementById(e.key);
  //   if (key) key.classList.add("pressed");
  // });

  // window.addEventListener("keyup", (e) => {
  //   const key = document.getElementById(e.key);
  //   if (key) key.classList.remove("pressed");
  // });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Tab") {
      // document.getElementById("HTML_ConvertArea").focus();
    }
  });

  // window.addEventListener("keyup", (e) => {
  //   if (e.key === "Tab") {
  //     document.getElementById("HTML_ConvertArea");
  //   }
  // });
  return <></>;
}
