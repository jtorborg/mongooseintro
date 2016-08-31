app.controller('BookController', ['$scope', '$http', function ($scope, $http) {
  $scope.books = []; // the array of books we expect
  $scope.newBook = {}; // a single book to be added to db
  $scope.displayBookId = '';    //this is will hold the ngclick to display info from a specific book;
  $scope.newComment = {};    // array for new comment

  $scope.postedBy = {};

  getBooks();

  /** --- Scoped functions -- **/
  $scope.submitNewBook = function () {
    var data = $scope.newBook;
    $http.post('/books', data)
      .then(function () {
        console.log('POST /books', data);
        getBooks();
      });
  };

  $scope.deleteBook = function (id) {
    $http.delete('/books/' + id)
      .then(function () {
        console.log('DELETE /books/', id);
        getBooks();
      });
  };

  $scope.updateBook = function (book) {
    var id = book._id;

    $http.put('/books/' + id, book)
      .then(function () {
        console.log('PUT /books', id);
        getBooks();
      });
  };

  $scope.displayComments = function (id) {
    $scope.displayBookId = id;
  };

  $scope.submitComment = function (id) {
    var data = $scope.newComment;
    //var commenter = $scope.postedBy;
    $http.post('/books/' + id + '/comments', data)
      .then(function () {
        console.log('POST /books/', id, '/comments', data);
        $scope.newComment = {};
        $scope.postedBy = {};

        getBooks();
      });
  };

  /** -- Utility functions -- **/
  function getBooks() {
    $http.get('/books/')
      .then(function (response) {
        console.log('GET /books', response.data);

        var bookDataArray = response.data;

        bookDataArray.forEach(function (book) {
          book.publishDate = new Date(book.publishDate);
        });

        $scope.books = bookDataArray;
      });
  }
}]);
