function searchStudioByName() {
    //get the first name 
    var studio_name_search_string  = document.getElementById('studio_name_search_string').value
    //construct the URL and redirect to it
    window.location = '/inventory/search/' + encodeURI(studio_name_search_string)
}
