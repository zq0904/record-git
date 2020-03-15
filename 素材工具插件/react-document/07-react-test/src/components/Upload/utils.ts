/**
 * 通过readAsDataURL读取图片
 */
export const readPicture = (file: File): Promise<HTMLImageElement> => new Promise((resolve, reject) => {
  const reader = new FileReader()
  const image = new Image()
  image.onload = () => resolve(image)
  reader.onload = () => image.src = (reader.result as string)
  reader.readAsDataURL(file)
})
  
/**
 * @describe 据容器宽高 将图片缩放使其完全放入
 * @param {string} src 需要调整的图片
 * @param {number} wrapWh 容器wh
 * @returns {Promise<{src: string; scaleProportion: number}>} 调整后图片的src 缩放的比例
 */
export const zoomImg = (src: string, wrapWh: number): Promise<{src: string; scaleProportion: number}> => new Promise(resolve => {
  const image = new Image()
  image.setAttribute('crossOrigin', 'anonymous')
  image.onload = () => {
    let scaleProportion = 1
    const width = image.naturalWidth
    const height = image.naturalHeight
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (width > height) { // 等比缩放 将 width -> wrapWh
      scaleProportion = wrapWh / width
      canvas.width = wrapWh
      canvas.height = scaleProportion * height
    } else { // 等比缩放 将 height -> wrapWh
      scaleProportion = wrapWh / height
      canvas.width = scaleProportion * width
      canvas.height = wrapWh
    }
    ctx && ctx.drawImage(image, 0, 0, width, height, 0, 0, canvas.width, canvas.height) // 图片dom对象 在图片上的定位坐标XY 截取的图片大小WH 画布上的坐标XY 画布上的大小WH
    resolve({
      src: canvas.toDataURL('image/jpeg', 1),
      scaleProportion
    })
  }
  image.src = src
})

/**
 * @describe 获取裁剪图src
 * @param {HTMLImageElement} image 图片dom元素
 * @param {*} crop 旋转标识
 * @returns {string} 获取裁剪图src
 */
export const getCroppedSrc = (image: HTMLImageElement, crop: any) => {
  const canvas = document.createElement('canvas')
  canvas.width = crop.width
  canvas.height = crop.height
  const ctx = canvas.getContext('2d')
  ctx && ctx.drawImage(image, crop.x, crop.y, crop.width, crop.height, 0, 0, canvas.width, canvas.height) // 图片dom对象 在图片上的定位坐标XY 截取的图片大小WH 画布上的坐标XY 画布上的大小WH
  return canvas.toDataURL('image/jpeg', 1)
}

/**
 * @describe 获取(旋转|翻转)后的图片src
 * @param {HTMLImageElement} image 图片dom元素
 * @param {'left' | 'right' | 'horizontal' | 'vertical'} f 标识
 * @returns {string} 旋转|翻转后的图片src
 */
export const getConversionSrc = (image: HTMLImageElement, f: 'left' | 'right' | 'horizontal' | 'vertical' = 'left') => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  const width = image.naturalWidth
  const height = image.naturalHeight
  switch (f) {
    case 'right': // 顺时针 旋转90°
      canvas.width = height // 先旋转canvas
      canvas.height = width
      ctx.translate(height, 0) // 重新映射起点位置
      ctx.rotate(Math.PI / 2) // 绘制的图形 顺时针旋转90
      break;
    case 'left': // 顺时针 旋转270°
      canvas.width = height
      canvas.height = width
      ctx.translate(0, width)
      ctx.rotate(-Math.PI / 2)
      break;
    case 'horizontal': // 水平翻转
      canvas.width = width
      canvas.height = height
      ctx.translate(canvas.width, 0)
      ctx.scale(-1, 1)
      break;
    case 'vertical': // 垂直翻转
      canvas.width = width
      canvas.height = height
      ctx.translate(0, canvas.height)
      ctx.scale(1, -1)
      break;
    default:
      //  顺时针 旋转180°
      //  canvas.width = width
      //  canvas.height = height
      //  ctx.translate(width, height)
      //  ctx.rotate(Math.PI)
  }
  ctx.drawImage(image, 0, 0, width, height, 0, 0, width, height) // 图片dom对象 在图片上的定位坐标XY 截取的图片大小WH 画布上的坐标XY 画布上的大小WH
  return canvas.toDataURL('image/jpeg', 1)
}
