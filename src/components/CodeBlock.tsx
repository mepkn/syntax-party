interface Props {
  html: string
}

export default function CodeBlock({ html }: Props) {
  return (
    <div
      className={[
        // shiki pre block
        '[&_pre]:m-0 [&_pre]:overflow-x-auto [&_pre]:p-4 [&_pre]:text-sm [&_pre]:leading-relaxed',
      ].join(' ')}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
