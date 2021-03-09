function searchOrderByID() {
    //get the first name 
    var ID  = document.getElementById('ID').value
    //construct the URL and redirect to it
    window.location = '/review_orders/' + parseInt(ID)
    
}