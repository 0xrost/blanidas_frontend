import type { EquipmentRepository as EquipmentRepositoryInterface } from "@/domain/repositories/equipment.ts";
import { EquipmentRepository as EquipmentRepositoryImplementation } from "@/infrastructure/api/equipment.ts";

import { RepairRequestRepository as RepairRequestRepositoryImplementation } from "@/infrastructure/api/repair-request.ts";
import type { RepairRequestRepository as RepairRequestRepositoryInterface } from "@/domain/repositories/repair-request.ts";

import { AuthRepository as AuthRepositoryImplementation } from "@/infrastructure/api/auth.ts";
import type { AuthRepository as AuthRepositoryInterface } from "@/domain/repositories/auth.ts";

import { EquipmentModelsRepository as EquipmentModelsRepositoryImplementation } from "@/infrastructure/api/equipment-models.ts";
import type { EquipmentModelsRepository as EquipmentModelsRepositoryInterface } from "@/domain/repositories/equipment-models.ts";

import { SparePartCategoriesRepository as SparePartCategoriesRepositoryImplementation } from "@/infrastructure/api/spare-part-categories.ts";
import type { SparePartCategoriesRepository as SparePartCategoriesRepositoryInterface } from "@/domain/repositories/spare-part-categories.ts";

import { SummaryRepository as SummaryRepositoryImplementation } from "@/infrastructure/api/summary.ts";
import type { SummaryRepository as SummaryRepositoryInterface } from "@/domain/repositories/summary.ts";

import { SuppliersRepository as SuppliersRepositoryImplementation } from "@/infrastructure/api/suppliers.ts";
import type { SuppliersRepository as SuppliersRepositoryInterface } from "@/domain/repositories/suppliers.ts";

import { InstitutionRepository as InstitutionRepositoryImplementation } from "@/infrastructure/api/institution.ts";
import type { InstitutionRepository as InstitutionRepositoryInterface } from "@/domain/repositories/institution.ts";

import { EquipmentCategoryRepository as EquipmentCategoryRepositoryImplementation } from "@/infrastructure/api/equipment-category.ts";
import type { EquipmentCategoryRepository as EquipmentCategoryRepositoryInterface } from "@/domain/repositories/equipment-category.ts";

import { FailureTypeRepository as FailureTypeRepositoryImplementation } from "@/infrastructure/api/failure-type.ts";
import type { FailureTypeRepository as FailureTypeRepositoryInterface } from "@/domain/repositories/failure-type.ts";

import { SparePartsRepository as SparePartRepositoryImplementation } from "@/infrastructure/api/spare-part.ts";
import type { SparePartsRepository as SparePartRepositoryInterface } from "@/domain/repositories/spare-part.ts";

import { AuthService as AuthServiceImplementation } from "@/infrastructure/services/auth.ts";
import {loginUseCase} from "@/domain/useCases/auth.ts";

import type {IManufacturersRepository} from "@/domain/repositories/manufacturers.ts";
import { ManufacturersRepository as ManufacturersRepositoryImplementation } from "@/infrastructure/api/manufacturers.ts";

const EquipmentRepository: EquipmentRepositoryInterface = new EquipmentRepositoryImplementation();
const RepairRequestRepository: RepairRequestRepositoryInterface = new RepairRequestRepositoryImplementation();
const AuthRepository: AuthRepositoryInterface = new AuthRepositoryImplementation();
const SummaryRepository: SummaryRepositoryInterface = new SummaryRepositoryImplementation();
const EquipmentCategoryRepository: EquipmentCategoryRepositoryInterface = new EquipmentCategoryRepositoryImplementation();
const InstitutionRepository: InstitutionRepositoryInterface = new InstitutionRepositoryImplementation();
const FailureTypeRepository: FailureTypeRepositoryInterface = new FailureTypeRepositoryImplementation();
const SparePartRepository: SparePartRepositoryInterface = new SparePartRepositoryImplementation();
const SparePartCategoriesRepository: SparePartCategoriesRepositoryInterface = new SparePartCategoriesRepositoryImplementation()
const EquipmentModelsRepository: EquipmentModelsRepositoryInterface = new EquipmentModelsRepositoryImplementation();
const SuppliersRepository: SuppliersRepositoryInterface = new SuppliersRepositoryImplementation();
const ManufacturersRepository: IManufacturersRepository = new ManufacturersRepositoryImplementation()

const AuthService: AuthServiceImplementation = new AuthServiceImplementation(loginUseCase(AuthRepository));

export {
    EquipmentRepository,
    RepairRequestRepository,
    AuthRepository,
    SummaryRepository,
    AuthService,
    EquipmentCategoryRepository,
    InstitutionRepository,
    FailureTypeRepository,
    SparePartRepository,
    SparePartCategoriesRepository,
    EquipmentModelsRepository,
    SuppliersRepository,
    ManufacturersRepository,
};