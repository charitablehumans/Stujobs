<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class DownloadDataVerify extends Mailable
{
    use Queueable, SerializesModels;

    public $user;

    /**
     * VerifyMail constructor.
     * @param $user
     *
     * Email verify constructor
     */
    public function __construct($code, $email)
    {
        $this->code = $code;
        $this->email = $email;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this
                ->subject('Stujobs : Votre demande de téléchargement de vos données')
                ->view('emails.downloadDataVerify')
                ->with([
                    'email' => $this->email,
                    'code' => $this->code
                ]);
    }
}
