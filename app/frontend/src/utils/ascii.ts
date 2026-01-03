export const dimensionAscii: Record<string, string> = {
    Physical: `
      .---.
     /_____\\
    (  ' '  )
     \\_-_-_/
     |     |
    /       \\
   //       \\\\
  //|       |\\\\
  | |       | |
  | |       | |
`,
    Mental: `
      .---.
     /  _  \\
    |  ( )  |
    |   _   |
     \\  _  /
      '---'
    .--. .--.
   /    Y    \\
  |    | |    |
  |    |_|    |
   \\         /
    '-------'
`,
    Social: `
      _   _
     ( ) ( )
    (   )   )
     \\ / \\ /
      V   V
     /     \\
    /       \\
   (         )
    \\       /
     '-----'
`,
    Financial: `
    $$$$$$$$$
   $$  _   $$
  $$  (_)   $$
  $$   |    $$
  $$  _|_   $$
  $$ (___)  $$
   $$     $$
    $$$$$$$
`,
    Spiritual: `
       /\\
      /  \\
     /    \\
    /  /\\  \\
   /  /  \\  \\
  /  /    \\  \\
 /__/      \\__\\
      ||||
      ||||
`,
    Creative: `
      .---.
     /     \\
    |  (@)  |
     \\     /
      '---'
       /|\\
      / | \\
     /  |  \\
    '---|---'
        |
       / \\
`,
    default: `
      [?]
     /   \\
    |  ?  |
     \\   /
      [?]
`
};

export const getAsciiArt = (dimension: string): string => {
    return dimensionAscii[dimension] || dimensionAscii['default'] || '';
};
