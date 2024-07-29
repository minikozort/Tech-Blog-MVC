const router = require('express').Router(); // Create a new router instance from Express
const { User } = require('../../models'); // Import the User model from the models directory

// Utility function to validate passwords
const validatePassword = (password) => {
  const specialCharRegex = /[!@#$%^&*()]/;
  const numberRegex = /\d/;
  return specialCharRegex.test(password) && numberRegex.test(password);
};

// Route to create a new user
router.post('/', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if password meets the requirements
    if (!validatePassword(password)) {
      return res.status(400).json({
        message: 'Password must include at least one special character (!@#$%^&*()) and one number.'
      });
    }

    // Create a new user with the data from the request body
    const userData = await User.create({ username, password });

    // Save user information in the session and respond with user data
    req.session.save(() => {
      req.session.user_id = userData.id; // Store user ID in session
      req.session.username = userData.username; // Store username in session
      req.session.logged_in = true; // Mark user as logged in

      res.status(200).json(userData); // Respond with the newly created user data
    });
  } catch (err) {
    // Respond with a 400 status code and error message if user creation fails
    res.status(400).json(err);
  }
});

// Route to log in a user
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const userData = await User.findOne({
      where: { username },
    });

    if (!userData) {
      return res.status(400).json({ message: 'Incorrect username or password, please try again' });
    }

    const validPassword = await userData.checkPassword(password);

    if (!validPassword) {
      return res.status(400).json({ message: 'Incorrect username or password, please try again' });
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.logged_in = true;

      console.log('Session data:', req.session); // Debugging line

      res.status(200).json({
        userData,
        message: 'You are now logged in!',
      });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route to log out a user
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    // Destroy the session and end the response
    req.session.destroy(() => {
      res.status(204).end(); // Respond with a 204 status code (No Content) on successful logout
    });
  } else {
    // Respond with a 404 status code if there was no active session to destroy
    res.status(404).end();
  }
});

module.exports = router; // Export the router to be used in other parts of the application
