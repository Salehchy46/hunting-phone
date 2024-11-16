const loadPhone = async (searchText) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
  const data = await res.json();
  const phones = data.data;
  // console.log(phones);
  displayPhones(phones) 
}

const displayPhones = phones => {
  // console.log(phones);
  //1 - take the id from HTML
  const phoneContainer = document.getElementById('phone-container');

  //2 - clear phone container cards before adding new cards
  phoneContainer.textContent = '';

  //display show all button if it contain more than 12
  const showAllContainer = document.getElementById('show-all-phone');
  if (phones.length > 12){
    showAllContainer.classList.remove('hidden');
  }
  else {
    showAllContainer.classList.add('hidden')
  }
  //display only 12 of results
  phones = phones.slice(0, 11);

  phones.forEach(phone => {
    // console.log(phone);

    //3 - Create a div
    const phoneCard = document.createElement('div');
    phoneCard.classList = `card bg-gray-100 p-4 shadow-xl`;
    //4 - Set inner HTML
    phoneCard.innerHTML = `
    <figure>
            <img
              src="${phone.image}"
              alt="Shoes" />
          </figure>
          <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>${phone.slug}</p>
            <div class="card-actions justify-end">
              <button class="btn btn-primary">Buy Now</button>
            </div>
          </div>
    `;
    //5 - Append child
    phoneContainer.appendChild(phoneCard);
  });

  //Hide loading spinner
  toggleLoadingSpinner(false);
}

const handleSearch = () =>{
  toggleLoadingSpinner(true);
  const getInputValue = document.getElementById('search-field');
  const searchText = getInputValue.value;
  console.log(searchText);
  loadPhone(searchText);
}

const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById('loading-spinner');
  if(isLoading){
    loadingSpinner.classList.remove('hidden')
  }
  else{
    loadingSpinner.classList.add('hidden');
  }
}

loadPhone();