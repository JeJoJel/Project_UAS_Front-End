function displayComments() {
    const commentsList = document.getElementById('comments-list');
    commentsList.innerHTML = ''; 

    const comments = JSON.parse(localStorage.getItem('comments')) || [];

    comments.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');
        commentElement.innerHTML = `
            <div class="comment-avatar">
                <img src="https://i.pinimg.com/736x/84/76/92/8476920d7bd7578d3a3c4a711c2a5501.jpg" alt="User Avatar">
            </div>
            <div class="comment-content">
                <h4>${comment.name} <span> | ${comment.date}</span></h4>
                <p>${comment.text}</p>
            </div>
        `;
        commentsList.appendChild(commentElement);
    });
}

document.getElementById('comment-form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const name = this.name.value;
    const email = this.email.value; 
    const text = this.comment.value;

    const newComment = {
        name: name,
        text: text,
        date: new Date().toLocaleDateString()
    };

    const comments = JSON.parse(localStorage.getItem('comments')) || [];

    comments.push(newComment);

    localStorage.setItem('comments', JSON.stringify(comments));

    this.reset();

    displayComments();
});

displayComments();

window.onload = function() {
    localStorage.removeItem('comments');

    document.getElementById('comments-list').innerHTML = '';
};
