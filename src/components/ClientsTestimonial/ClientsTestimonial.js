import styles from './ClientsTestimonial.module.scss'

function ClientsTestimonial({ client }) {

  return (

    <div key={client.id} className={styles.client}>
      <img className={styles.client__image} src={client.picture} alt="client" />
      <div className="client__info">
        <p className={styles.client__name}>{client.title} {client.firstName}</p>
        <p className={styles.client__text}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt perspiciatis consequatur tenetur, aspernatur dicta totam.</p>
      </div>
    </div>
  )
}

export default ClientsTestimonial