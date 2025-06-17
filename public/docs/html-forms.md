# HTML Forms

HTML forms are used to collect user input and submit data to a server or process it with JavaScript.

## Basic Structure

```html
<form action="/submit" method="POST">
  <label for="name">Name:</label>
  <input type="text" id="name" name="name">

  <input type="submit" value="Submit">
</form>
```

## Common Form Elements

- `<input>` – For text, email, password, checkbox, radio, etc.
- `<textarea>` – Multiline text input.
- `<select>` – Dropdown menu.
- `<button>` – Clickable button.

## Input Types

```html
<input type="text">
<input type="email">
<input type="password">
<input type="checkbox">
<input type="radio">
```

## Attributes

- `name` – Identifies the data.
- `id` – Associates with labels.
- `required` – Makes input mandatory.
- `placeholder` – Gives a hint to the user.

## Conclusion

Forms are integral to user interaction on the web and enable data collection and submission.
