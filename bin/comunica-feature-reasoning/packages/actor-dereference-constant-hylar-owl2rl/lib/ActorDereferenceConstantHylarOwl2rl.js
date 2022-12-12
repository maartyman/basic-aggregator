"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorDereferenceConstantHylarOwl2rl = void 0;
const bus_dereference_1 = require("@comunica/bus-dereference");
const reasoning_context_entries_1 = require("@comunica/reasoning-context-entries");
const Streamify = require('streamify-string');
/**
 * A comunica Constant Hylar Owl2rl Dereference Actor.
 */
class ActorDereferenceConstantHylarOwl2rl extends bus_dereference_1.ActorDereference {
    constructor(args) {
        super(args);
    }
    test(action) {
        return __awaiter(this, void 0, void 0, function* () {
            if (action.url === reasoning_context_entries_1.KeysRdfDereferenceConstantHylar.owl2rl) {
                return true;
            }
            throw new Error(`This actor requires the url to be set to the constant ${reasoning_context_entries_1.KeysRdfDereferenceConstantHylar.owl2rl}`);
        });
    }
    run(action) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                data: Streamify(data),
                url: 'owl2rl.hylar',
                requestTime: 0,
                exists: true,
            };
        });
    }
}
exports.ActorDereferenceConstantHylarOwl2rl = ActorDereferenceConstantHylarOwl2rl;
const data = `
(?p http://www.w3.org/2000/01/rdf-schema#domain ?c) ^ (?x ?p ?y) -> (?x http://www.w3.org/1999/02/22-rdf-syntax-ns#type ?c)
(?p http://www.w3.org/2000/01/rdf-schema#range ?c) ^ (?x ?p ?y) -> (?y http://www.w3.org/1999/02/22-rdf-syntax-ns#type ?c)
(?p http://www.w3.org/1999/02/22-rdf-syntax-ns#type http://www.w3.org/2002/07/owl#FunctionalProperty) ^ (?x ?p ?y1) ^ (?x ?p ?y2) -> (?y1 http://www.w3.org/2002/07/owl#sameAs ?y2)
(?p http://www.w3.org/1999/02/22-rdf-syntax-ns#type http://www.w3.org/2002/07/owl#InverseFunctionalProperty) ^ (?x1 ?p ?y) ^ (?x2 ?p ?y) -> (?x1 http://www.w3.org/2002/07/owl#sameAs ?x2)
(?p http://www.w3.org/1999/02/22-rdf-syntax-ns#type http://www.w3.org/2002/07/owl#IrreflexiveProperty) ^ (?x ?p ?x) -> false
(?p http://www.w3.org/1999/02/22-rdf-syntax-ns#type http://www.w3.org/2002/07/owl#SymmetricProperty) ^ (?x ?p ?y) -> (?y ?p ?x)
(?p http://www.w3.org/1999/02/22-rdf-syntax-ns#type http://www.w3.org/2002/07/owl#AsymmetricProperty) ^ (?x ?p ?y) ^ (?y ?p ?x) -> false
(?p http://www.w3.org/1999/02/22-rdf-syntax-ns#type http://www.w3.org/2002/07/owl#TransitiveProperty) ^ (?x ?p ?y) ^ (?y ?p ?z) -> (?x ?p ?z)
(?p1 http://www.w3.org/2000/01/rdf-schema#subPropertyOf ?p2) ^ (?x ?p1 ?y) -> (?x ?p2 ?y)
(?x ?p1 ?y) ^ (?p2 http://www.w3.org/2002/07/owl#propertyChainAxiom ?n) ^ (?n http://www.w3.org/1999/02/22-rdf-syntax-ns#first ?p1) ^ (?n http://www.w3.org/1999/02/22-rdf-syntax-ns#rest ?n2) ^ (?n2 http://www.w3.org/1999/02/22-rdf-syntax-ns#first ?p2) ^ (?y ?p2 ?z) -> (?x ?p2 ?z)
(?p1 http://www.w3.org/2002/07/owl#equivalentProperty ?p2) ^ (?x ?p1 ?y) -> (?x ?p2 ?y)
(?p1 http://www.w3.org/2002/07/owl#equivalentProperty ?p2) ^ (?x ?p2 ?y) -> (?x ?p1 ?y)
(?p1 http://www.w3.org/2002/07/owl#propertyDisjointWith ?p2) ^ (?x ?p1 ?y) ^ (?x ?p2 ?y) -> false
(?p1 http://www.w3.org/2002/07/owl#inverseOf ?p2) ^ (?x ?p1 ?y) -> (?y ?p2 ?x)
(?p1 http://www.w3.org/2002/07/owl#inverseOf ?p2) ^ (?x ?p2 ?y) -> (?y ?p1 ?x)
(?x http://www.w3.org/2002/07/owl#sourceIndividual ?i1) ^ (?x http://www.w3.org/2002/07/owl#assertionProperty ?p) ^ (?x http://www.w3.org/2002/07/owl#targetIndividual ?i2) ^ (?i1 ?p ?i2) -> false
(?x http://www.w3.org/2002/07/owl#sourceIndividual ?i) ^ (?x http://www.w3.org/2002/07/owl#assertionProperty ?p) ^ (?x http://www.w3.org/2002/07/owl#targetValue ?lt) ^ (?i ?p ?lt) -> false
(?x http://www.w3.org/1999/02/22-rdf-syntax-ns#type http://www.w3.org/2002/07/owl#Nothing) -> false
(?c1 http://www.w3.org/2002/07/owl#complementOf ?c2) ^ (?x http://www.w3.org/1999/02/22-rdf-syntax-ns#type ?c1) ^ (?x http://www.w3.org/1999/02/22-rdf-syntax-ns#type ?c2) -> false
(?x http://www.w3.org/2002/07/owl#someValuesFrom ?y) ^ (?x http://www.w3.org/2002/07/owl#onProperty ?p) ^ (?u ?p ?v) ^ (?v http://www.w3.org/1999/02/22-rdf-syntax-ns#type ?y) -> (?u http://www.w3.org/1999/02/22-rdf-syntax-ns#type ?x)
(?x http://www.w3.org/2002/07/owl#someValuesFrom http://www.w3.org/2002/07/owl#Thing) ^ (?x http://www.w3.org/2002/07/owl#onProperty ?p) ^ (?u ?p ?v) -> (?u http://www.w3.org/1999/02/22-rdf-syntax-ns#type ?x)
(?x http://www.w3.org/2002/07/owl#allValuesFrom ?y) ^ (?x http://www.w3.org/2002/07/owl#onProperty ?p) ^ (?u http://www.w3.org/1999/02/22-rdf-syntax-ns#type ?x) ^ (?u ?p ?v) -> (?v http://www.w3.org/1999/02/22-rdf-syntax-ns#type ?y)
(?x http://www.w3.org/2002/07/owl#hasValue ?y) ^ (?x http://www.w3.org/2002/07/owl#onProperty ?p) ^ (?u http://www.w3.org/1999/02/22-rdf-syntax-ns#type ?x) -> (?u ?p ?y)
(?x http://www.w3.org/2002/07/owl#hasValue ?y) ^ (?x http://www.w3.org/2002/07/owl#onProperty ?p) ^ (?u ?p ?y) -> (?u http://www.w3.org/1999/02/22-rdf-syntax-ns#type ?x)
(?x http://www.w3.org/2002/07/owl#maxCardinality "0"^^xsd:nonNegativeInteger) ^ (?x http://www.w3.org/2002/07/owl#onProperty ?p) ^ (?u http://www.w3.org/1999/02/22-rdf-syntax-ns#type ?x) ^ (?u ?p ?y) -> false
(?x http://www.w3.org/2002/07/owl#maxCardinality "1"^^xsd:nonNegativeInteger) ^ (?x http://www.w3.org/2002/07/owl#onProperty ?p) ^ (?u http://www.w3.org/1999/02/22-rdf-syntax-ns#type ?x) ^ (?u ?p ?y1) ^ (?u ?p ?y2) -> (?y1 http://www.w3.org/2002/07/owl#sameAs ?y2)
(?x http://www.w3.org/2002/07/owl#maxQualifiedCardinality "0"^^xsd:nonNegativeInteger) ^ (?x http://www.w3.org/2002/07/owl#onProperty ?p) ^ (?x http://www.w3.org/2002/07/owl#onClass ?c) ^ (?u http://www.w3.org/1999/02/22-rdf-syntax-ns#type ?x) ^ (?u ?p ?y) ^ (?y http://www.w3.org/1999/02/22-rdf-syntax-ns#type ?c) -> false
(?x http://www.w3.org/2002/07/owl#maxQualifiedCardinality "0"^^xsd:nonNegativeInteger) ^ (?x http://www.w3.org/2002/07/owl#onProperty ?p) ^ (?x http://www.w3.org/2002/07/owl#onClass http://www.w3.org/2002/07/owl#Thing) ^ (?u http://www.w3.org/1999/02/22-rdf-syntax-ns#type ?x) ^ (?u ?p ?y) -> false
(?x http://www.w3.org/2002/07/owl#maxQualifiedCardinality "1"^^xsd:nonNegativeInteger) ^ (?x http://www.w3.org/2002/07/owl#onProperty ?p) ^ (?x http://www.w3.org/2002/07/owl#onClass ?c) ^ (?u http://www.w3.org/1999/02/22-rdf-syntax-ns#type ?x) ^ (?u ?p ?y1) ^ (?y1 http://www.w3.org/1999/02/22-rdf-syntax-ns#type ?c) ^ (?u ?p ?y2) ^ (?y2 http://www.w3.org/1999/02/22-rdf-syntax-ns#type ?c) -> (?y1 http://www.w3.org/2002/07/owl#sameAs ?y2)
(?x http://www.w3.org/2002/07/owl#maxQualifiedCardinality "1"^^xsd:nonNegativeInteger) ^ (?x http://www.w3.org/2002/07/owl#onProperty ?p) ^ (?x http://www.w3.org/2002/07/owl#onClass http://www.w3.org/2002/07/owl#Thing) ^ (?u http://www.w3.org/1999/02/22-rdf-syntax-ns#type ?x) ^ (?u ?p ?y1) ^ (?u ?p ?y2) -> (?y1 http://www.w3.org/2002/07/owl#sameAs ?y2)
(?c1 http://www.w3.org/2000/01/rdf-schema#subClassOf ?c2) ^ (?x http://www.w3.org/1999/02/22-rdf-syntax-ns#type ?c1) -> (?x http://www.w3.org/1999/02/22-rdf-syntax-ns#type ?c2)
(?c1 http://www.w3.org/2002/07/owl#equivalentClass ?c2) ^ (?x http://www.w3.org/1999/02/22-rdf-syntax-ns#type ?c1) -> (?x http://www.w3.org/1999/02/22-rdf-syntax-ns#type ?c2)
(?c1 http://www.w3.org/2002/07/owl#equivalentClass ?c2) ^ (?x http://www.w3.org/1999/02/22-rdf-syntax-ns#type ?c2) -> (?x http://www.w3.org/1999/02/22-rdf-syntax-ns#type ?c1)
(?c1 http://www.w3.org/2002/07/owl#disjointWith ?c2) ^ (?x http://www.w3.org/1999/02/22-rdf-syntax-ns#type ?c1) ^ (?x http://www.w3.org/1999/02/22-rdf-syntax-ns#type ?c2) -> false
(?c http://www.w3.org/1999/02/22-rdf-syntax-ns#type http://www.w3.org/2002/07/owl#Class) -> (?c http://www.w3.org/2000/01/rdf-schema#subClassOf ?c) ^ (?c http://www.w3.org/2002/07/owl#equivalentClass ?c) ^ (?c http://www.w3.org/2000/01/rdf-schema#subClassOf http://www.w3.org/2002/07/owl#Thing) ^ (http://www.w3.org/2002/07/owl#Nothing http://www.w3.org/2000/01/rdf-schema#subClassOf ?c)
(?c1 http://www.w3.org/2000/01/rdf-schema#subClassOf ?c2) ^ (?c2 http://www.w3.org/2000/01/rdf-schema#subClassOf ?c3) -> (?c1 http://www.w3.org/2000/01/rdf-schema#subClassOf ?c3)
(?c1 http://www.w3.org/2002/07/owl#equivalentClass ?c2) -> (?c1 http://www.w3.org/2000/01/rdf-schema#subClassOf ?c2) ^ (?c2 http://www.w3.org/2000/01/rdf-schema#subClassOf ?c1)
(?c1 http://www.w3.org/2000/01/rdf-schema#subClassOf ?c2) ^ (?c2 http://www.w3.org/2000/01/rdf-schema#subClassOf ?c1) -> (?c1 http://www.w3.org/2002/07/owl#equivalentClass ?c2)
(?p http://www.w3.org/1999/02/22-rdf-syntax-ns#type http://www.w3.org/2002/07/owl#ObjectProperty) -> (?p http://www.w3.org/2000/01/rdf-schema#subPropertyOf ?p) ^ (?p http://www.w3.org/2002/07/owl#equivalentProperty ?p)
(?p http://www.w3.org/1999/02/22-rdf-syntax-ns#type http://www.w3.org/2002/07/owl#DatatypeProperty) -> (?p http://www.w3.org/2000/01/rdf-schema#subPropertyOf ?p) ^ (?p http://www.w3.org/2002/07/owl#equivalentProperty ?p)
(?p1 http://www.w3.org/2000/01/rdf-schema#subPropertyOf ?p2) ^ (?p2 http://www.w3.org/2000/01/rdf-schema#subPropertyOf ?p3) -> (?p1 http://www.w3.org/2000/01/rdf-schema#subPropertyOf ?p3)
(?p1 http://www.w3.org/2002/07/owl#equivalentProperty ?p2) -> (?p1 http://www.w3.org/2000/01/rdf-schema#subPropertyOf ?p2) ^ (?p2 http://www.w3.org/2000/01/rdf-schema#subPropertyOf ?p1)
(?p1 http://www.w3.org/2000/01/rdf-schema#subPropertyOf ?p2) ^ (?p2 http://www.w3.org/2000/01/rdf-schema#subPropertyOf ?p1) -> (?p1 http://www.w3.org/2002/07/owl#equivalentProperty ?p2)
(?p http://www.w3.org/2000/01/rdf-schema#domain ?c1) ^ (?c1 http://www.w3.org/2000/01/rdf-schema#subClassOf ?c2) -> (?p http://www.w3.org/2000/01/rdf-schema#domain ?c2)
(?p2 http://www.w3.org/2000/01/rdf-schema#domain ?c) ^ (?p1 http://www.w3.org/2000/01/rdf-schema#subPropertyOf ?p2) -> (?p1 http://www.w3.org/2000/01/rdf-schema#domain ?c)
(?p http://www.w3.org/2000/01/rdf-schema#range ?c1) ^ (?c1 http://www.w3.org/2000/01/rdf-schema#subClassOf ?c2) -> (?p http://www.w3.org/2000/01/rdf-schema#range ?c2)
(?p2 http://www.w3.org/2000/01/rdf-schema#range ?c) ^ (?p1 http://www.w3.org/2000/01/rdf-schema#subPropertyOf ?p2) -> (?p1 http://www.w3.org/2000/01/rdf-schema#range ?c)
(?c1 http://www.w3.org/2002/07/owl#hasValue ?i) ^ (?c1 http://www.w3.org/2002/07/owl#onProperty ?p1) ^ (?c2 http://www.w3.org/2002/07/owl#hasValue ?i) ^ (?c2 http://www.w3.org/2002/07/owl#onProperty ?p2) ^ (?p1 http://www.w3.org/2000/01/rdf-schema#subPropertyOf ?p2) -> (?c1 http://www.w3.org/2000/01/rdf-schema#subClassOf ?c2)
(?c1 http://www.w3.org/2002/07/owl#someValuesFrom ?y1) ^ (?c1 http://www.w3.org/2002/07/owl#onProperty ?p) ^ (?c2 http://www.w3.org/2002/07/owl#someValuesFrom ?y2) ^ (?c2 http://www.w3.org/2002/07/owl#onProperty ?p) ^ (?y1 http://www.w3.org/2000/01/rdf-schema#subClassOf ?y2) -> (?c1 http://www.w3.org/2000/01/rdf-schema#subClassOf ?c2)
(?c1 http://www.w3.org/2002/07/owl#someValuesFrom ?y) ^ (?c1 http://www.w3.org/2002/07/owl#onProperty ?p1) ^ (?c2 http://www.w3.org/2002/07/owl#someValuesFrom ?y) ^ (?c2 http://www.w3.org/2002/07/owl#onProperty ?p2) ^ (?p1 http://www.w3.org/2000/01/rdf-schema#subPropertyOf ?p2) -> (?c1 http://www.w3.org/2000/01/rdf-schema#subClassOf ?c2)
(?c1 http://www.w3.org/2002/07/owl#allValuesFrom ?y1) ^ (?c1 http://www.w3.org/2002/07/owl#onProperty ?p) ^ (?c2 http://www.w3.org/2002/07/owl#allValuesFrom ?y2) ^ (?c2 http://www.w3.org/2002/07/owl#onProperty ?p) ^ (?y1 http://www.w3.org/2000/01/rdf-schema#subClassOf ?y2) -> (?c1 http://www.w3.org/2000/01/rdf-schema#subClassOf ?c2)
(?c1 http://www.w3.org/2002/07/owl#allValuesFrom ?y) ^ (?c1 http://www.w3.org/2002/07/owl#onProperty ?p1) ^ (?c2 http://www.w3.org/2002/07/owl#allValuesFrom ?y) ^ (?c2 http://www.w3.org/2002/07/owl#onProperty ?p2) ^ (?p1 http://www.w3.org/2000/01/rdf-schema#subPropertyOf ?p2) -> (?c2 http://www.w3.org/2000/01/rdf-schema#subClassOf ?c1)
`;
