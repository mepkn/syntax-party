interface Props {
  html: string
}

export default function CodeBlock({ html }: Props) {
  return (
    <div
      className={[
        // prose description line above the code fence
        '[&_p]:px-4 [&_p]:pt-3 [&_p]:pb-1 [&_p]:text-[13px] [&_p]:leading-relaxed',
        '[&_p]:text-neutral-500 dark:[&_p]:text-neutral-400',
        // inline code inside the description (e.g. `let`, `const`)
        '[&_p_code]:font-mono [&_p_code]:text-[12px]',
        '[&_p_code]:bg-neutral-100 dark:[&_p_code]:bg-neutral-800',
        '[&_p_code]:text-neutral-700 dark:[&_p_code]:text-neutral-300',
        '[&_p_code]:px-1.5 [&_p_code]:py-0.5 [&_p_code]:rounded',
        // shiki pre block
        '[&_pre]:m-0 [&_pre]:overflow-x-auto [&_pre]:p-4 [&_pre]:text-sm [&_pre]:leading-relaxed',
      ].join(' ')}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
