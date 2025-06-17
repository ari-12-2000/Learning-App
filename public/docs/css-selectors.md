# CSS Selectors

CSS selectors define the elements to which a set of CSS rules apply. They enable precise targeting of HTML elements based on various attributes, structures, or relationships.

## Types of Selectors

### 1. Universal Selector
```css
* {
  margin: 0;
  padding: 0;
}
```

### 2. Type Selector
```css
p {
  font-size: 16px;
}
```

### 3. Class Selector
```css
.card {
  border: 1px solid #ccc;
}
```

### 4. ID Selector
```css
#main-header {
  background-color: #333;
}
```

### 5. Attribute Selector
```css
input[type="text"] {
  border: 1px solid #000;
}
```

### 6. Grouping Selector
```css
h1, h2, h3 {
  font-family: Arial, sans-serif;
}
```

### 7. Descendant and Child Selectors
```css
div p {
  color: gray;
}

div > p {
  color: blue;
}
```

### 8. Pseudo-class and Pseudo-element Selectors
```css
a:hover {
  text-decoration: underline;
}

p::first-line {
  font-weight: bold;
}
```

## Conclusion

Selectors form the foundation of CSS rule application and are essential for creating maintainable and scalable stylesheets.
