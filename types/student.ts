export interface StudentScoreResponse {
  success: boolean
  data: {
    sbd: string
    toan: number | null
    ngu_van: number | null
    ngoai_ngu: number | null
    ma_ngoai_ngu: string | null
    vat_li: number | null
    hoa_hoc: number | null
    sinh_hoc: number | null
    lich_su: number | null
    dia_li: number | null
    gdcd: number | null
  }
}

export interface StudentScore {
  sbd: string
  scores: {
    toan: number | null
    ngu_van: number | null
    ngoai_ngu: number | null
    ma_ngoai_ngu: string | null
    vat_li: number | null
    hoa_hoc: number | null
    sinh_hoc: number | null
    lich_su: number | null
    dia_li: number | null
    gdcd: number | null
  }
  averages: {
    naturalScience: number | null
    socialScience: number | null
    groupA: number | null
    groupA1: number | null
    groupB: number | null
    groupC: number | null
    groupD: number | null
  }
}

export interface TopStudent {
  sbd: string
  toan: number | null
  ngu_van: number | null
  ngoai_ngu: number | null
  ma_ngoai_ngu: string | null
  vat_li: number | null
  hoa_hoc: number | null
  sinh_hoc: number | null
  lich_su: number | null
  dia_li: number | null
  gdcd: number | null
}
