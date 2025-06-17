# CSS Box Model

The CSS box model describes the rectangular boxes generated for elements in the document tree. Understanding the box model is fundamental to layout and spacing in web design.

## Components of the Box Model

1. **Content**  
   The actual text or image inside the box.

2. **Padding**  
   Clears an area around the content. The padding is transparent.

3. **Border**  
   A line surrounding the padding (if any) and content.

4. **Margin**  
   Clears space outside the border. Also transparent.

## Visualization

```
+-------------+
|   Margin    |
| +---------+ |
| | Padding | |
| | +-----+ | |
| | |Content| |
| | +-----+ | |
| +---------+ |
+-------------+
```

## Example

```css
div {
  margin: 20px;
  padding: 10px;
  border: 2px solid black;
}
```

## Box-Sizing Property

```css
box-sizing: border-box;
```

Using `border-box` includes padding and border in the element's total width and height.

## Conclusion

Mastering the box model is crucial for effective layout control and element spacing in CSS.
