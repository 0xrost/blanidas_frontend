import type { EquipmentRepository as EquipmentRepositoryInterface } from "@/domain/repositories/equipment.ts";
import { EquipmentRepository as EquipmentRepositoryImplementation } from "@/infrastructure/api/equipment.ts";

import { RepairRequestRepository as RepairRequestRepositoryImplementation } from "@/infrastructure/api/repair-request.ts";
import type { RepairRequestRepository as RepairRequestRepositoryInterface } from "@/domain/repositories/repair-request.ts";

import { AuthRepository as AuthRepositoryImplementation } from "@/infrastructure/api/auth.ts";
import type { AuthRepository as AuthRepositoryInterface } from "@/domain/repositories/auth.ts";

import { EquipmentModelRepository as EquipmentModelRepositoryImplementation } from "@/infrastructure/api/equipment-models.ts";
import type { EquipmentModelRepository as EquipmentModelRepositoryInterface } from "@/domain/repositories/equipment-models.ts";

import { SparePartCategoryRepository as SparePartCategoryRepositoryImplementation } from "@/infrastructure/api/spare-part-categories.ts";
import type { SparePartCategoryRepository as SparePartCategoryRepositoryInterface } from "@/domain/repositories/spare-part-categories.ts";

import { SummaryRepository as SummaryRepositoryImplementation } from "@/infrastructure/api/summary.ts";
import type { SummaryRepository as SummaryRepositoryInterface } from "@/domain/repositories/summary.ts";

import { SupplierRepository as SupplierRepositoryImplementation } from "@/infrastructure/api/suppliers.ts";
import type { SupplierRepository as SupplierRepositoryInterface } from "@/domain/repositories/suppliers.ts";

import { InstitutionRepository as InstitutionRepositoryImplementation } from "@/infrastructure/api/institution.ts";
import type { InstitutionRepository as InstitutionRepositoryInterface } from "@/domain/repositories/institution.ts";

import { InstitutionTypeRepository as InstitutionTypeRepositoryImplementation } from "@/infrastructure/api/institution-type.ts";
import type { InstitutionTypeRepository as InstitutionTypeRepositoryInterface } from "@/domain/repositories/institution-type.ts";

import { EquipmentCategoryRepository as EquipmentCategoryRepositoryImplementation } from "@/infrastructure/api/equipment-category.ts";
import type { EquipmentCategoryRepository as EquipmentCategoryRepositoryInterface } from "@/domain/repositories/equipment-category.ts";

import { FailureTypeRepository as FailureTypeRepositoryImplementation } from "@/infrastructure/api/failure-type.ts";
import type { FailureTypeRepository as FailureTypeRepositoryInterface } from "@/domain/repositories/failure-type.ts";

import { SparePartRepository as SparePartRepositoryImplementation } from "@/infrastructure/api/spare-part.ts";
import type { SparePartRepository as SparePartRepositoryInterface } from "@/domain/repositories/spare-part.ts";

import { ManufacturerRepository as ManufacturerRepositoryImplementation } from "@/infrastructure/api/manufacturers.ts";
import type { ManufacturerRepository as ManufacturerRepositoryInterface } from "@/domain/repositories/manufacturers.ts";

import { UserRepository as UserRepositoryImplementation } from "@/infrastructure/api/user.ts";
import type { UserRepository as UserRepositoryInterface } from "@/domain/repositories/user.ts"

import { AuthService as AuthServiceImplementation } from "@/infrastructure/services/auth.ts";
import { QrCodeService as QrCodeServiceImplementation } from "@/infrastructure/services/qrCode.ts";

import {loginUseCase, refreshUseCase} from "@/domain/useCases/auth.ts";
import {BaseClientURL} from "@/options.ts";


const EquipmentRepository: EquipmentRepositoryInterface = new EquipmentRepositoryImplementation();
const RepairRequestRepository: RepairRequestRepositoryInterface = new RepairRequestRepositoryImplementation();
const AuthRepository: AuthRepositoryInterface = new AuthRepositoryImplementation();
const SummaryRepository: SummaryRepositoryInterface = new SummaryRepositoryImplementation();
const EquipmentCategoryRepository: EquipmentCategoryRepositoryInterface = new EquipmentCategoryRepositoryImplementation();
const InstitutionRepository: InstitutionRepositoryInterface = new InstitutionRepositoryImplementation();
const FailureTypeRepository: FailureTypeRepositoryInterface = new FailureTypeRepositoryImplementation();
const SparePartRepository: SparePartRepositoryInterface = new SparePartRepositoryImplementation();
const SparePartCategoryRepository: SparePartCategoryRepositoryInterface = new SparePartCategoryRepositoryImplementation()
const EquipmentModelRepository: EquipmentModelRepositoryInterface = new EquipmentModelRepositoryImplementation();
const SupplierRepository: SupplierRepositoryInterface = new SupplierRepositoryImplementation();
const ManufacturerRepository: ManufacturerRepositoryInterface = new ManufacturerRepositoryImplementation()
const UserRepository: UserRepositoryInterface = new UserRepositoryImplementation();
const InstitutionTypeRepository: InstitutionTypeRepositoryInterface = new InstitutionTypeRepositoryImplementation();

const AuthService: AuthServiceImplementation = new AuthServiceImplementation(loginUseCase(AuthRepository), refreshUseCase(AuthRepository));
const QrCodeService: QrCodeServiceImplementation = new QrCodeServiceImplementation(BaseClientURL + "/repair-request/$equipmentId");

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
    SparePartCategoryRepository,
    EquipmentModelRepository,
    SupplierRepository,
    ManufacturerRepository,
    UserRepository,
    InstitutionTypeRepository,
    QrCodeService,
};