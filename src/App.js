import { Formik, Form, Field } from "formik";
import { useState } from "react";
import './header.css'
import './content.css'
import './article.css'



const App = () => {
  const [photos, setPhotos] = useState([])
  const open = url => window.open(url)

  console.log(photos);
  
  return (
    <>
      <header>
        <Formik
          initialValues={{search: ''}}
          onSubmit = { async values => {
            const response = await fetch(`https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`, {
              headers: {
                'Authorization': 'Client-ID k1zwQWa_PrETJvsqEJ7P5TvjkN9SSCOdh5GaxhORG4Y'
              }
            })
            const data = await response.json()
            setPhotos(data.results)
            
          }}>
          <Form>
            <Field name="search" placeholder="Search" />
          </Form>
        </Formik>
      </header>
      <div className="container">
        <div className="center">
          {photos.map(photo =>
            <article key={photo.id}>
              <img src={photo.urls.regular} alt={photo.alt_description} onClick={() => open(photo.links.html)}/>
              <p>{[photo.description, photo.alt_description].join(' - ')}</p>
            </article>)}
        </div>
      </div>
    </>
  )
}

export default App;
