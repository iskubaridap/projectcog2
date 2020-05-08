<div class="modal inmodal" id="emailModal" tabindex="-1" role="dialog"  aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content animated fadeIn">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Email us</h4>
            </div>
            <div class="modal-body">
                <form role="form">
                    <div class="form-group">
                        <label for="userEmail">Email address</label>
                        <input type="email" class="form-control" name="userEmail" id="userEmail" placeholder="Email" required>
                    </div>
                    <div class="form-group">
                        <label for="userMessage">Message</label>
                        <textarea class="form-control" name="userMessage" id="userMessage" placeholder="Password" required></textarea>
                    </div>
                    <button id="submitFeedback" type="submit" class="btn btn-lg btn-success pull-right">Submit</button>
                </form>
            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>