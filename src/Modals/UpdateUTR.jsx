import { Icon } from '@iconify/react';
import React from 'react'
import styled from 'styled-components'

const Container = styled.div`

    .table tbody tr {
        --bs-table-bg-type: #fff !important;
    }

    .table>:not(caption)>*>* {
        padding: 0.3rem !important;
    }

    .blueBggg{
        background-color: var(--blueBggSettings) !important;
    }

    .form-control{
        background-color: #fff;
        border: 0.4 solid #C4C4C4 !important;
        color: var(--formControlTextColor);
        box-shadow: none !important
    }

    .textBlue{
        color: var(--cardsBlueText) !important;
    }

    .btnPublishUser, .btnPublishUser:active, .btnPublishUser:focus{
        color: var(--sidebarBackground);
        background-color: var(--publishBtn);
    }

    .text2Grey{
        color: var(--greyText3Color) !important;
    }

    .form-check-input:checked {
        background-color: var(--cardsBlueText);
        border-color: var(--cardsBlueText);
    }

`;

const UpdateUTR = () => {
    return (
        <Container>
            <div className="container-fluid p-0">
                <div className="row blueBggg m-1 borderRadius12 p-2">
                    <div className="rowBlue borderRadiusTop d-flex justify-content-between p-2 border-bottom">
                        <p className='font16 text-center'></p>
                        <p className='font16 text-center'>update  7842876992@XXX</p>
                        <Icon icon="mdi:cross-circle-outline" width="1.1em" height="1.1em" style={{ color: '#B5B5B5' }} data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <form className='p-3' action="">
                        <div className="mb-2">
                            <label for="exampleInputEmail1" class="form-label text2Grey font14">UPI</label>
                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-2">
                            <label for="exampleInputEmail1" class="form-label text2Grey font14">PayIn Limit</label>
                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-2">
                            <label for="exampleInputEmail1" class="form-label text2Grey font14">UPI Catergory</label>
                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-2">
                            <label for="exampleInputEmail1" class="form-label text2Grey font14">Mobile</label>
                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-2">
                            <label for="exampleInputEmail1" class="form-label text2Grey font14">Mobile</label>
                            <div class="form-check">
                                <input class="form-check-input p-2" type="checkbox" value="" id="flexCheckChecked" />
                                <label class="form-check-label" for="flexCheckChecked">
                                    Yes
                                </label>
                            </div>                        
                        </div>
                    </form>
                </div>
                <div className="row p-3 justify-content-center">
                    <button className='col-4 btn btnPublishUser'>Update</button>
                </div>
            </div>
        </Container>
    )
}

export default UpdateUTR