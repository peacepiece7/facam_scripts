export type ProductSource = {
  title: string
  link: string
  thumbSrc: string
}
export type ProductDetailSource = {
  price: number
  imgSrc: string
  genres: string[]
  description: string
}

export type ProductRequestBody = {
  title: string // 제품 이름 (필수!)
  price: number // 제품 가격 (필수!)
  description: string // 제품 상세 설명 (필수!)
  tags?: string[] // 제품 태그
  thumbnailBase64?: string // 제품 썸네일(대표) 사진(base64) - jpg, jpeg, webp, png, gif, svg
  photoBase64?: string // 제품 상세 사진(base64) - jpg, jpeg, webp, png, gif, svg
  discountRate?: number // 제품 할인율
}
