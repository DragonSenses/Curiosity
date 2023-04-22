# Autosave a form field

Create a `textarea` field that "autosaves" its value on every change.

So, if the user accidentally closes the page, and opens it again, he'll find his unfinished input at place.


---

Starter code / Sandbox:

```html
<!doctype html>
<textarea style="width:200px; height: 60px;" id="area"></textarea>
```

---

## Answer:

```html
<!doctype html>
<textarea style="width:200px; height: 60px;" id="area" placeholder="Write here"></textarea>
<br>
<button onclick="localStorage.removeItem('area');area.value=''">Clear</button>
<script>
    area.value = localStorage.getItem('area');
    area.oninput = () => {
      localStorage.setItem('area', area.value)
    };
</script>
```

