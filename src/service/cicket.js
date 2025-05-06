// export async function fetchCricketData() {
//   const url = 'https://cricbuzz-cricket.p.rapidapi.com/matches/v1/recent';
//   const options = {
//     method: 'GET',
//     headers: {
//       'X-RapidAPI-Key': '61b5d7ecc0mshacb81e3ff189e17p196c59jsnd7468a0e5f03',
//       'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com'
//     }
//   };

//   const response = await fetch(url, options);
//   if (!response.ok) {
//     throw new Error('Network response was not ok');
//   }
//   return response.json();
// }