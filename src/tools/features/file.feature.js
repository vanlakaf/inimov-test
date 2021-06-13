export const images = (imgPath) =>
  require.context("../../assets/medias/imgs", true)(imgPath).default
