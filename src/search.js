const ACCESS_TOKEN = 'kowlp6zufxm98hgqsf09jhbfll0ig4n3jahlzrly'
$(document).ready(function(){
  let serverResponse = ''
  let blockKeys = ''
  let order = {}
  const searchInputContainer = document.getElementById('search-input-container')

  fetchData()

  $(document.body).on('input', '#search-box', function(e){
    const searchResultBox = createSearchResultBox(serverResponse)
    if(searchResultBox) {
      searchInputContainer.appendChild(searchResultBox)
    }
  });

  $(document.body).on('click', '.config-container' ,function(e){
    createSearchResultBox(serverResponse)
  })

  function SearchData(dataList, searchKey) {
    this.dataList = dataList;
    this.searchKey = searchKey;
  }

  function fetchData() {
    $.ajax({
      url: "https://api.json-generator.com/templates/uTmXiX_UxDeW/data",
      headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
      context: document.body,
    }).done(function(response) {
      serverResponse = response
      blockKeys = Object.keys(response)
      createConfiguration(blockKeys)
    });
  }

  function createSearchResultBox(response) {
    let container = document.getElementById('search-result')
    if(!container) {
      container = document.createElement("div")
      container.id = 'search-result'
    } else {
      container.innerHTML = ''
    }
    container.classList.add('border', 'w-100')

    createBlocksWithConfiguration(response, container)

    return container
  }

  function createConfiguration(blockKeys) {
    let elements = ''
    if(!blockKeys) return;

    blockKeys.forEach(key => {
      const checkbox = `<input type="checkbox" class="config-checkbox mr-2" id="${key}-config" checked></input>`
      const label = `<label for="${key}-config">${key}</label><br>`

      elements += `<div class='config-container d-inline-block mx-2' name="${key}-config"> ${checkbox}${label} </div>`
    })

    const configContainer = blockContainerCreator(elements, {class: 'd-inline-block'})

    searchInputContainer.innerHTML += configContainer
  }

  function createBlocksWithConfiguration(response, container) {
    const searchBoxKey = document.getElementById('search-box').value
    if(searchBoxKey == '') return

    const suggestionObject = new SearchData(response.suggestions, searchBoxKey)
    const collectionObject = new SearchData(response.collections, searchBoxKey)
    const productObject = new SearchData(response.products, searchBoxKey)
    const orderElement = document.getElementById('search-box').getAttribute('order')
    const orders = orderElement ? orderElement.split(',') : ['0','1','2']
    const blocks = [
      createSuggestionsBlock(suggestionObject),
      createCollectionsBlock(collectionObject),
      createProductsBlock(productObject)
    ]

    orders.forEach(order => {
      container.innerHTML += blocks[parseInt(order)]
    })
  }


  function createSuggestionsBlock(suggestionObject) {
    if(!document.getElementById('suggestions-config').checked) return;

    let elements = ''
    const title = `<p class='bg-secondary text-white pl-2'> Suggestions </p>`
    elements += title

    suggestionObject.dataList.forEach((suggestion) => {
      if(suggestion.term.toLowerCase().includes(suggestionObject.searchKey)) {
        const suggestionTerm = `<p class='pl-2 mb-1 text-truncate'> ${suggestion.term} </p>`
        elements += suggestionTerm
      }
    })

    return blockContainerCreator(elements, {id: 'suggestion-container'})
  }
  function createCollectionsBlock(collectionObject) {
    if(!document.getElementById('collections-config').checked) return;

    let elements = ''
    const title = `<p class='bg-secondary text-white pl-2'> Collections </p>`
    elements += title

    collectionObject.dataList.forEach((collection) => {
      if(collection.title.toLowerCase().includes(collectionObject.searchKey)) {
        const collectionTitle = `<a href='${collection.url}' class='colletion-title pl-2 text-dark d-block mb-1 text-truncate'>${collection.title}</a>`
        elements += collectionTitle
      }
    })

    return blockContainerCreator(elements, {id: 'collection-container'})
  }

  function createProductsBlock(productObject) {
    if(!document.getElementById('products-config').checked) return;

    let elements = ''
    const title = `<p class='bg-secondary text-white pl-2'> Products </p>`
    elements += title

    productObject.dataList.forEach((product) => {
      if(product.title.toLowerCase().includes(productObject.searchKey) || product.brand.toLowerCase().includes(productObject.searchKey)) {
        const productImage = `<div class='product-image-container col-6 col-md-3'><img src='${product.image}' class='product-image w-100'/></div>`
        const productTitle = `<p class='product-title mb-1 text-truncate'>${product.title}</p>`
        const productBrand = `<p class='product-brand text-truncate'> ${product.brand} </p>`
        const productPrice = `<p class='product-price font-weight-bold'> ${product.price} </p>`
        const productInfo = `<div class='col-6 col-md-9'> ${productTitle}${productBrand}${productPrice} </div>`

        elements += blockContainerCreator(productImage + productInfo, {tag: 'a', class: 'row w-100 mx-0 border-bottom text-dark text-decoration-none', href: product.url})
      }
    })

    return blockContainerCreator(elements, {id: 'product-container'})
  }

  function blockContainerCreator(elements, options={}) {
    const tag = options.tag || "div"
    const href = options.href ? `href='${options.href}'` : ''

    return `<${tag} id='${options.id || ''}' class='${options.class || ''}'` + href + `> ${elements} </${tag}>`
  }
});

