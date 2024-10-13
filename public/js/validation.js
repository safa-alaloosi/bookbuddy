document.addEventListener('DOMContentLoaded', (event) => {
    const addBookForm = document.getElementById('addBookForm');
    const addRecommendationForm = document.getElementById('addRecommendationForm');

    if (addBookForm) {
        addBookForm.addEventListener('submit', (e) => {
            const title = document.getElementById('title').value.trim();
            const author = document.getElementById('author').value.trim();

            if (title.length === 0 || author.length === 0) {
                e.preventDefault();
                alert('Please fill in both title and author fields.');
            }
        });
    }

    if (addRecommendationForm) {
        addRecommendationForm.addEventListener('submit', (e) => {
            const userId = document.getElementById('userId').value;
            const bookId = document.getElementById('bookId').value;

            if (userId < 1 || !bookId) {
                e.preventDefault();
                alert('Please enter a valid user ID and select a book.');
            }
        });
    }
});