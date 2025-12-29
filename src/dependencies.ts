import type { EquipmentRepository as EquipmentRepositoryInterface } from "@/domain/repositories/equipment.ts";
import { EquipmentRepository as EquipmentRepositoryImplementation } from "@/infrastructure/api/equipment.ts";

import { RepairRequestRepository as RepairRequestRepositoryImplementation } from "@/infrastructure/api/repair-request.ts";
import type { RepairRequestRepository as RepairRequestRepositoryInterface } from "@/domain/repositories/repair-request.ts";

import { AuthRepository as AuthRepositoryImplementation } from "@/infrastructure/api/auth.ts";
import type { AuthRepository as AuthRepositoryInterface } from "@/domain/repositories/auth.ts";

import { SummaryRepository as SummaryRepositoryImplementation } from "@/infrastructure/api/summary.ts";
import type { SummaryRepository as SummaryRepositoryInterface } from "@/domain/repositories/summary.ts";

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

const EquipmentRepository: EquipmentRepositoryInterface = new EquipmentRepositoryImplementation();
const RepairRequestRepository: RepairRequestRepositoryInterface = new RepairRequestRepositoryImplementation();
const AuthRepository: AuthRepositoryInterface = new AuthRepositoryImplementation();
const SummaryRepository: SummaryRepositoryInterface = new SummaryRepositoryImplementation();
const EquipmentCategoryRepository: EquipmentCategoryRepositoryInterface = new EquipmentCategoryRepositoryImplementation();
const InstitutionRepository: InstitutionRepositoryInterface = new InstitutionRepositoryImplementation();
const FailureTypeRepository: FailureTypeRepositoryInterface = new FailureTypeRepositoryImplementation();
const SparePartRepository: SparePartRepositoryInterface = new SparePartRepositoryImplementation();

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
};