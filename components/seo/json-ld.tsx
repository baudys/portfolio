interface JsonLdProps {
  data: object
}

export const JsonLd = ({ data }: JsonLdProps) => {
  const serialized = JSON.stringify(data).replace(/</g, '\\u003c')

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: serialized }}
    />
  )
}
