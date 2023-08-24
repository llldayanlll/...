document.getElementById('commentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const commentText = document.getElementById('commentText').value;
    
    // Create a new GitHub Issue using the GitHub API
    fetch('https://api.github.com/repos/yourusername/yourrepo/issues', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer YOUR_ACCESS_TOKEN', // Replace with your access token
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: 'New Comment',
            body: commentText
        })
    })
    .then(response => response.json())
    .then(data => {
        // Reload comments to display the new comment
        loadComments();
    })
    .catch(error => console.error('Error:', error));
});

// Load comments from GitHub Issues and display them
function loadComments() {
    fetch('https://api.github.com/repos/yourusername/yourrepo/issues')
    .then(response => response.json())
    .then(data => {
        const commentsDiv = document.getElementById('comments');
        commentsDiv.innerHTML = '';
        
        data.forEach(issue => {
            const commentDiv = document.createElement('div');
            commentDiv.classList.add('comment');
            commentDiv.innerHTML = `
                <h3>Comment:</h3>
                <p>${issue.body}</p>
            `;
            commentsDiv.appendChild(commentDiv);
        });
    })
    .catch(error => console.error('Error:', error));
}

// Load comments when the page loads
window.addEventListener('load', loadComments);
