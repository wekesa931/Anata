/* eslint max-classes-per-file: ["error", 5] */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint no-underscore-dangle: 0 */

import { Model } from '@nozbe/watermelondb'
import { text, field } from '@nozbe/watermelondb/decorators'
import { CollectionType } from 'src/storage/types'

export class Vitals extends Model {
  static table = CollectionType.VITALS

  @text('antaraId') antaraId!: string

  @field('weight') weight?: number

  @field('height') height?: number

  @field('bmi') bmi?: number

  @text('six_lead_ecg_findings') sixLeadEcgFindings?: string

  @field('respiratory_rate') respiratoryRate?: number

  @field('oxygen_saturation') oxygenSaturation?: number

  @field('temperature') temperature?: number

  @field('water_content') waterContent?: number

  @field('mid_upper_arm_circumference') midUpperArmCircumference?: number

  @field('waist_circumference') waistCircumference?: number

  @field('waisthip_ratio') waisthipRatio?: number

  @field('bone_density') boneDensity?: number

  @field('body_fat') bodyFat?: number

  @field('visceral_fat') visceralFat?: number

  @field('muscle_mass') muscleMass?: number

  @field('muscle_mass_weight_ratio') muscleMassWeightRatio?: number

  @field('timestamp') timestamp?: string

  @text('measurer') measurer?: string

  get raw() {
    // return all fields without the id and timestamp
    const { id, _changed, _status, ...rest } = this._raw
    return rest
  }
}

export default [Vitals]
