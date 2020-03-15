import React, { useRef, useEffect, FC, useState } from 'react'
import { observer, useLocalStore } from 'mobx-react'
import { readPicture, zoomImg, getCroppedSrc, getConversionSrc } from './utils'
// @ts-ignore
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import './index.css'

type crop = {
  x: number;
  y: number;
  width: number;
  height: number;
  aspect: number;
  scaleProportion: number;
}

const wrapWh = 360 // 容器wh
const minWh = 100 // 选框最小wh

const Upload: FC<{ originalSrc: string }> = observer(({ originalSrc }) => {
  const imgRef = useRef<HTMLImageElement | null>(null) // 缩放完成后的图片dom
  const store = useLocalStore(() => ({
    loading: true,
    initialSrc: '', // 缩放完 最初src 用于还原 
    nowSrc: '', // 当前展示的图片src
    croppedSrc: '', // 预览图片src
    crop: { // 选框相关信息
      x: 0,
      y: 0,
      width: minWh,
      height: minWh, // 不写根据比例自动计算
      aspect: 1, // 选框wh比例
      scaleProportion: 1 // 缩放比
    },
    setStore(payload: any) { Object.assign(this, payload) },

    // 原后端 所需数据 都相对于最originalSrc
    rotate: 0, // 旋转值 0不旋转 1右旋 2 3  -1 -2 -3
    x: 1, // 翻转值 1不翻转 -1左右翻转
    y: 1,
    get reqData() {
      return {
        x1: (this.crop.x / this.crop.scaleProportion).toFixed(0),
        y1: (this.crop.y / this.crop.scaleProportion).toFixed(0),
        x2: (this.crop.x / this.crop.scaleProportion + this.crop.width / this.crop.scaleProportion).toFixed(0),
        y2: (this.crop.y / this.crop.scaleProportion + this.crop.height / this.crop.scaleProportion).toFixed(0),
        x: this.x,
        y: this.y,
        rotate: this.rotate,
      }
    }

  }))
  const handleChange = (crop: crop) => {
    if (!imgRef.current) return
    // width height 限制
    if (crop.width < minWh) crop.width = minWh
    if (crop.height < minWh) crop.height = minWh
    const smallVal = imgRef.current.naturalWidth < imgRef.current.naturalHeight ? imgRef.current.naturalWidth : imgRef.current.naturalHeight
    if (crop.width > smallVal) crop.width = smallVal
    if (crop.height > smallVal) crop.height = smallVal
    ;(crop.width > crop.height) ? crop.height = crop.width : crop.width = crop.height // 同步较大值
    // x y 限制
    if (crop.x < 0) crop.x = 0
    if (crop.y < 0) crop.y = 0
    if (crop.x > imgRef.current.naturalWidth - crop.width) crop.x = imgRef.current.naturalWidth - crop.width
    if (crop.y > imgRef.current.naturalHeight - crop.height) crop.y = imgRef.current.naturalHeight - crop.height
    // console.log('handleChange crop', crop)
    store.setStore({
      crop,
      croppedSrc: getCroppedSrc(imgRef.current, crop) // 获取裁剪图
    })
  }
  useEffect(() => {
    ((async () => {
      store.setStore({ loading: true })
      const { src, scaleProportion } = await zoomImg(originalSrc, wrapWh)
      store.setStore({
        loading: false,
        initialSrc: src,
        nowSrc: src,
        crop: {
          x: 0,
          y: 0,
          width: minWh,
          height: minWh,
          aspect: 1,
          scaleProportion
        }
      })
    })())
  }, [originalSrc, store])

  if (store.loading) return <>loading...</>
  return (
    <>
      <ReactCrop
        className="react-crop-wrap"
        src={store.nowSrc}
        crop={store.crop}
        onChange={handleChange} // Change过程 回调
        onComplete={handleChange} // 完成 回调
        onImageLoaded={(image: HTMLImageElement) => imgRef.current = image}
      />
      <p>
        <button
          onClick={() => {
            // 防抖
            // 记录旋转值
            if (!imgRef.current) return
            store.setStore({
              nowSrc: getConversionSrc(imgRef.current, 'right')
            })
          }}
        >右旋转</button><br/>
        <button
          onClick={() => {
            if (!imgRef.current) return
            store.setStore({
              nowSrc: getConversionSrc(imgRef.current, 'vertical')
            })
          }}
        >上下翻转</button><br/>
        <button
          onClick={() => {
            store.setStore({
              nowSrc: store.initialSrc
            })
          }}
        >还原</button>
      </p>
      <div className="preview size-100">
        { store.croppedSrc && <img src={store.croppedSrc} alt="" /> }
      </div>
      <div className="preview size-80">
        { store.croppedSrc && <img src={store.croppedSrc} alt="" /> }
      </div>
      <div className="preview size-50">
        { store.croppedSrc && <img src={store.croppedSrc} alt="" /> }
      </div>
      <pre>
        后端所需数据<br/>
        {
          JSON.stringify(store.reqData, null, 2)
        }
      </pre>
    </>
  )
})

const Example = observer(() => {
  const [originalSrc, setOriginalSrc] = useState<null | string>(null) // 本地加载 原初始base64 src
  const localUpload = () => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.addEventListener('change', async () => {
      if (!input.files) return
      const file = input.files[0]
      if (!['image/jpeg', 'image/png'].includes(file.type)) return alert('上传的图片必须为jpeg/jpg/png格式！')
      if (file.size > 1024 * 1024 * 2) return alert('上传的图片必须小于等于2M！')
      const loadImg = await readPicture(file)
      if (loadImg.naturalWidth < minWh || loadImg.naturalHeight < minWh) return alert(`图片尺寸不能小于${minWh}！`)
      setOriginalSrc(loadImg.src)
    })
    input.click()
  }
  return (
    <>
      <p><button onClick={localUpload}>本地上传</button></p>
      {
        originalSrc && <Upload originalSrc={originalSrc} />
      }
    </>
  )
})

export default Example
