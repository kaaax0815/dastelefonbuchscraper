Not maintained anymore. May still work
# Das Telefonbuch Scraper

## 💻 First Start

### Web

```html
<script src="https://unpkg.com/das-telefonbuch-scraper/dist/bundle.js"></script>
```

### Module

```bash
npm install das-telefonbuch-scraper -S
```

### CLI

```bash
npm install das-telefonbuch-scraper -g 
```

## 🚀 Usage

### Web

```js
const names = await dastelefonbuch.reverseLookup(<number>);
```

### Module

```ts
import reverseLookup from 'das-telefonbuch-scraper'
const names = await reverseLookup(<number>);
```

### CLI

```bash
reverseLookup
```

## 📖 Documentation

reverseLookup returns a Promise;

It returns on object of the following form:
status: 'done' | 'error' | 'not found'
succeeded: boolean // If the lookup was successful
error?: unknown // Only if error occurs
result?: string[] // Only if all went successful

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
