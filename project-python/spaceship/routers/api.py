from fastapi import APIRouter
import numpy

router = APIRouter()


@router.get('')
def hello_world() -> dict:
    return {'msg': 'Hello, World!'}

@router.get('/matrices')
def  generate_matrices_and_multiply() -> dict:
    matrix_a = numpy.random.rand(10, 10)
    matrix_b = numpy.random.rand(10, 10)
    product = numpy.matmul(matrix_a, matrix_b)
    return {
        'matrix_a': matrix_a.tolist(),
        'matrix_b':matrix_b.tolist(),
        'product':product.tolist(),
    }